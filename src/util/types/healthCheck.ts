import { nanoid } from "nanoid";

export type HealthCheck = {
    health_check : string,
    group : string, 
    status : "PASS" | "FAIL",
    reason : string,
}

export type HealthCheckGroup = {
    group : string,
    count : number,
}

export type HealthCheckPage = {
    healthCheckGroups : HealthCheck[][],
    page : number,
    totalPages : number,
}

export interface HealthCheckAsyncOperations {

    getHealthCheckPage(page : number) : Promise<HealthCheckPage>;

    searchHealthCheckPages(search : string, page : number) : Promise<HealthCheckPage>;

}

export class HealthChecks {

    private static groups = [
        "Group 1",
        "Group 2",
        "Group 3",
        "Group 4",
        "Group 5",
        "Group 6",
        "Group 7",
        "Group 8",
    ]

    private static finiteGroup() : string {
        
        let randInt = Math.floor(Math.random() * HealthChecks.groups.length);
        return HealthChecks.groups[randInt];

    }

    private static reasons = [
        "Reason 1",
        "Reason 2",
        "Reason 3",
        "Reason 4",
        "Reason 5",
        "Reason 6",
        "Reason 7",
        "Reason 8",
    ];

    private static finiteReason() : string {

        let randInt = Math.floor(Math.random() * HealthChecks.reasons.length);
        return HealthChecks.reasons[randInt];

    }

    public static randomHealthCheck() : HealthCheck {

        let randInt = Math.floor(Math.random() * 8);
        let status : "PASS" | "FAIL" = randInt % 2 === 0 ? "PASS" : "FAIL";

        return {
            health_check : nanoid(),
            group : HealthChecks.finiteGroup(),
            status,
            reason : HealthChecks.finiteReason(),
        };

    }

    public static group(healthChecks : HealthCheck[]) : HealthCheck[][] {

        const mapping = new Map<string, HealthCheck[]>();
        for (const healthCheck of healthChecks) {
            const group = mapping.get(healthCheck.group);
            if (group) {
                group.push(healthCheck);
            } else {
                mapping.set(healthCheck.group, [healthCheck]);
            }
        }

        return Array.from(mapping.values());

    }

}