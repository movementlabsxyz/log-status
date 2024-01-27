import type { NextApiRequest, NextApiResponse } from 'next'
import { MockHealthCheckAsyncOperations, PostgresHealthCheckAsyncOperations } from '@/data'
import { HealthCheck, HealthCheckPage } from '@/util';

const operations = process.env.MOCK ?
  new MockHealthCheckAsyncOperations() :
  new PostgresHealthCheckAsyncOperations();

type RequestData = {
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
    const healthChecks = await operations.getHealthCheckPage(data.page??0);

    res.status(200).json({ 
      healthChecks
    });
    
}