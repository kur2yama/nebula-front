import { request } from 'umi';

export async function welcome(): Promise<any> {
  return request('/v1/backend/statistic/welcome');
}

export async function clearCache(): Promise<any> {
  return request('/v1/backend/statistic/welcome', {
    method: 'delete',
  });
}
