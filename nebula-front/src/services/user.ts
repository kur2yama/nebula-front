import { request } from 'umi';

export async function search(params: any): Promise<any> {
  return request('/v1/backend/users', {
    params,
  });
}

export async function find({ id }: { id: any }): Promise<any> {
  return request(`/v1/backend/users/${id}`, {});
}

export async function create({ data }: { data: any }): Promise<any> {
  return request(`/v1/backend/users`, {
    method: 'post',

    data,
  });
}

export async function update({ id, data }: { id: any; data: any }): Promise<any> {
  return request(`/v1/backend/users/${id}`, {
    method: 'put',

    data,
  });
}

export async function resetPwd({ id, data }: { id: any; data: any }): Promise<any> {
  return request(`/v1/backend/users/${id}/password`, {
    method: 'put',
    data,
  });
}

export async function destroy({ id }: { id: any }): Promise<any> {
  return request(`/v1/backend/users/${id}`, {
    method: 'delete',
  });
}
