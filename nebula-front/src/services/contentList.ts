import { request } from 'umi';

export async function search(params: any): Promise<any> {
  return request('/v1/backend/content', {
    params,
  });
}

export async function find({ id }: { id: any }): Promise<any> {
  return request(`/v1/backend/content/${id}`, {});
}

export async function create({ data }: { data: any }): Promise<any> {
  return request(`/v1/backend/content`, {
    method: 'post',
    data,
  });
}

export async function update({ id, data }: { id: any; data: any }): Promise<any> {
  return request(`/v1/backend/content/${id}`, {
    method: 'put',
    data,
  });
}

export async function destroy({ id }: { id: any }): Promise<any> {
  return request(`/v1/backend/content/${id}`, {
    method: 'delete',
  });
}

export async function bulkDestroy(data: any): Promise<any> {
  return request(`/v1/backend/content/bulk`, {
    method: 'delete',
    data,
  });
}

export async function clearCache({ id }: { id: any }): Promise<any> {
  return request(`/v1/backend/content/${id}/cache`, {
    method: 'delete',
  });
}

export async function fetch({ id }: { id: any }): Promise<any> {
  return request(`/v1/content/${id}`);
}
