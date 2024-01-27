import { Pool } from 'pg';
import { HealthCheck, HealthChecks, HealthCheckPage, HealthCheckAsyncOperations } from "@/util";

export type PostgresConfig = {
    user: string,
    host: string,
    database: string,
    password: string,
    port: number
};

export class PostgresHealthCheckAsyncOperations implements HealthCheckAsyncOperations {

    private pool: Pool;
    private static pageSize = process.env.POSTGRES_PAGE_SIZE ? parseInt(process.env.POSTGRES_PAGE_SIZE) : 32;

    constructor() {
        this.pool = new Pool({
            ssl : {
                rejectUnauthorized: process.env.PQ_SSL_REJECT_UNAUTHORIZED === "true"
            }
        });
    }

    private async executePostgresQuery(query: string, params: any[] = []): Promise<any> {
        const client = await this.pool.connect();
        try {
            const res = await client.query(query, params);
            return res.rows;
        } finally {
            client.release();
        }
    }

    public async getHealthCheckPage(page: number): Promise<HealthCheckPage> {
        const offset = PostgresHealthCheckAsyncOperations.pageSize * page;
        const query = `
WITH GroupedHealthChecks AS (
    SELECT 
        *, 
        DENSE_RANK() OVER (ORDER BY "group") as group_rank
    FROM 
        LatestHealthChecks
),
TotalGroups AS (
    SELECT 
        COUNT(DISTINCT "group") as total_groups
    FROM 
        LatestHealthChecks
)
SELECT 
    hc.*,
    CEIL((SELECT total_groups FROM TotalGroups)::DECIMAL / $3) as total_pages
FROM 
    GroupedHealthChecks hc
WHERE
    hc.group_rank >= $1 and hc.group_rank < $2
ORDER BY 
    hc."group", hc.health_check;
        
        `;
        const params = [
            offset, 
            offset + PostgresHealthCheckAsyncOperations.pageSize, 
            PostgresHealthCheckAsyncOperations.pageSize
        ];

        const result = await this.executePostgresQuery(query, params);
        if(result.length === 0) 
            return {
                healthCheckGroups : [],
                page : page,
                totalPages : 0
            } 

        const checks = result.map((row: any) => ({
            health_check: row.health_check,
            group: row.group,
            status: row.status ? 'PASS' : 'FAIL',
            reason: row.reason
        }));
        const groups = HealthChecks.group(checks);

        return {
            healthCheckGroups : groups,
            page : page,
            totalPages : result[0].total_pages
        }
    
    }

    public async searchHealthCheckPages(search: string, page: number): Promise<HealthCheckPage> {
        const offset = PostgresHealthCheckAsyncOperations.pageSize * page;
        const query = `
SELECT * FROM LatestHealthChecks WHERE health_check LIKE $1 GROUP BY group LIMIT $2 OFFSET $3
`;
        const params = [`%${search}%`, PostgresHealthCheckAsyncOperations.pageSize, offset];
        const result = await this.executePostgresQuery(query, params);
        
        if(result.length === 0) 
            return {
                healthCheckGroups : [],
                page : page,
                totalPages : 0
            }

        const checks = result.map((row: any) => ({
            health_check: row.health_check,
            group: row.group,
            status: row.status ? 'PASS' : 'FAIL',
            reason: row.reason
        }));

        const groups = HealthChecks.group(checks);

        return {
            healthCheckGroups : groups,
            page : page,
            totalPages : result[0].total_pages
        }

    }

}    