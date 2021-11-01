import { request } from 'umi';

export async function search(params: any): Promise<any> {
  return request('/v1/backend/acl', {
    params,
  });
}

export async function sync(): Promise<any> {
  return request(`/v1/backend/acl`, {
    method: 'post',
  });
}

export async function update({ id, data }: { id: any; data: any }): Promise<any> {
  return request(`/v1/backend/acl/${id}`, {
    method: 'put',
    data,
  });
}

export async function updateBulk(data: any): Promise<any> {
  return request(`/v1/backend/acl/bulk`, {
    method: 'put',
    data,
  });
}
