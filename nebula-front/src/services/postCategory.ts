import { request } from 'umi';

export async function publicFind({ id }: { id: any }): Promise<any> {
  return request(`/v1/posts/category/${id}`);
}

export async function search(params: any): Promise<any> {
  return request('/v1/backend/posts/categories', {
    params,
  });
}

export async function fix(): Promise<any> {
  return request('/v1/backend/posts/categories/fix', {
    method: 'put',
  });
}

export async function create({ data }: { data: any }): Promise<any> {
  return request(`/v1/backend/posts/categories`, {
    method: 'post',
    data,
  });
}

export async function update({ id, data }: { id: any; data: any }): Promise<any> {
  return request(`/v1/backend/posts/categories/${id}`, {
    method: 'put',
    data,
  });
}

export async function destroy({ id }: { id: any }): Promise<any> {
  return request(`/v1/backend/posts/categories/${id}`, {
    method: 'delete',
  });
}
