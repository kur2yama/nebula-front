import { request } from 'umi';

export async function searchAll(params: any): Promise<any> {
  return request('/v1/backend/roles/all', {
    params,
  });
}

export async function search(params: any): Promise<any> {
  return request('/v1/backend/roles', {
    params,
  });
}

export async function create({ data }: { data: any }): Promise<any> {
  return request(`/v1/backend/roles`, {
    method: 'post',

    data,
  });
}

export async function update({ id, data }: { id: number; data: any }): Promise<any> {
  return request(`/v1/backend/roles/${id}`, {
    method: 'put',

    data,
  });
}

export async function destroy({ id }: { id: any }): Promise<any> {
  return request(`/v1/backend/roles/${id}`, {
    method: 'delete',
  });
}
