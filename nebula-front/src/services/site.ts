import { request } from 'umi';

export async function find() {
  return request(`/v1/sites/1`);
}

export async function update(data: any): Promise<any> {
  return request('/v1/backend/sites/1', {
    method: 'put',
    data,
  });
}
