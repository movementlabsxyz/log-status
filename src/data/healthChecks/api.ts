import { HealthCheckPage, HealthCheckAsyncOperations } from "@/util";

export type ApiHealthCheckRoutes = {
    get : string,
    search : string
}

export class ApiHealthCheckAsyncOperations implements HealthCheckAsyncOperations {

    private routes : ApiHealthCheckRoutes;
    constructor(routes : ApiHealthCheckRoutes = {
        get : "/api/getHealthChecks",
        search : "/api/searchHealthChecks",
    }) {
        this.routes = routes;
    }
       
    public async getHealthCheckPage(page: number): Promise<HealthCheckPage> {
        
        const post = await fetch(this.routes.get, { 
            body : JSON.stringify({ page }),
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await post.json();
        console.log(data);
        return data.healthChecks;

    }

    public async searchHealthCheckPages(search: string, page: number): Promise<HealthCheckPage> {

        const post = await fetch(this.routes.search, { 
            body : JSON.stringify({ search, page }),
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await post.json();
        return data.healthChecks;

    }

}