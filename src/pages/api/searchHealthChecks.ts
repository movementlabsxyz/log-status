import type { NextApiRequest, NextApiResponse } from 'next'
import { MockHealthCheckAsyncOperations, PostgresHealthCheckAsyncOperations } from '@/data'
import { HealthCheck, HealthCheckPage } from '@/util';

const operations = process.env.MOCK ?
  new MockHealthCheckAsyncOperations() :
  new PostgresHealthCheckAsyncOperations({
    user: process.env.POSTGRES_USER ?? "user",
    host: process.env.POSTGRES_HOST ?? "localhost",
    database: process.env.POSTGRES_DB ?? "Logs",
    password: process.env.POSTGRES_PASSWORD ?? "password",
    port: parseInt(process.env.POSTGRES_PORT ?? "5432")
  });

type RequestData = {
  search : string,
  page ? : number
}
 
type ResponseData = {
  healthChecks: HealthCheckPage
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const data = req.body as RequestData;
    const healthChecks = await operations.searchHealthCheckPages(
        data.search, data.page??0
    );

    res.status(200).json({ 
        healthChecks
    });
    
}