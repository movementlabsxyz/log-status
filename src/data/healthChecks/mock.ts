import { HealthCheck, HealthCheckPage, HealthCheckAsyncOperations, HealthChecks } from "@/util";

export class MockHealthCheckAsyncOperations implements HealthCheckAsyncOperations {

    private healthChecks : HealthCheck[];
    private static pageSize = 32;
    private latency : number;

    constructor(size : number = 256, latency : number = 1000) {
        let healthChecks : HealthCheck[] = [];
        for (let i = 0; i < size; i++) 
            healthChecks.push(HealthChecks.randomHealthCheck());
        this.healthChecks = healthChecks;
        this.latency = latency;
    }

    public async introduceLatency(): Promise<void> {
        const randomLatency = Math.floor(Math.random() * this.latency/2) + this.latency/2;
        await new Promise((resolve) => setTimeout(resolve, randomLatency));
    }
       
    public async getHealthCheckPage(page: number): Promise<HealthCheckPage> {
        
        this.introduceLatency();
        let start = page * MockHealthCheckAsyncOperations.pageSize;
        let end = start + MockHealthCheckAsyncOperations.pageSize;
        const checks = this.healthChecks.slice(start, end);
        const groups = HealthChecks.group(checks);

        return {
            healthCheckGroups: groups,
            page,
            totalPages: Math.ceil(this.healthChecks.length / MockHealthCheckAsyncOperations.pageSize)
        }

    }

    public async searchHealthCheckPages(search: string, page: number): Promise<HealthCheckPage> {

        this.introduceLatency();
        let start = page * MockHealthCheckAsyncOperations.pageSize;
        let end = start + MockHealthCheckAsyncOperations.pageSize;
        let filtered = this.healthChecks.filter((healthCheck) => {
            return healthCheck.group.includes(search) || healthCheck.reason.includes(search);
        });
        const checks = filtered.slice(start, end);
        const groups = HealthChecks.group(checks);

        return {
            healthCheckGroups: groups,
            page,
            totalPages: Math.ceil(filtered.length / MockHealthCheckAsyncOperations.pageSize)
        }

    }


}