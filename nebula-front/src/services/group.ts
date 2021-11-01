import { request } from 'umi';

export async function search(params: any): Promise<any> {
  return request('/v1/backend/groups', {
    params,
  });
}

export async function fix(): Promise<any> {
  return request('/v1/backend/groups/fix', {});
}

export async function create({ data }: { data: any }): Promise<any> {
  return request(`/v1/backend/groups`, {
    method: 'post',
    data,
  });
}

export async function update({ id, data }: { id: any; data: any }): Promise<any> {
  return request(`/v1/backend/groups/${id}`, {
    method: 'put',
    data,
  });
}

export async function destroy({ id }: { id: any }): Promise<any> {
  return request(`/v1/backend/groups/${id}`, {
    method: 'delete',
  });
}
