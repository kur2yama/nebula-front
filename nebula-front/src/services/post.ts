import { request } from 'umi';

export async function publicFind({ id }: { id: any }): Promise<any> {
  return request(`/v1/posts/${id}`);
}

export async function publicSearch(params: any): Promise<any> {
  return request(`/v1/posts`, {
    params,
  });
}

export async function list(params: any): Promise<any> {
  return request('/v1/backend/posts', {
    params,
  });
}

export async function search(params: any): Promise<any> {
  return request('/v1/backend/posts/search', {
    params,
  });
}

export async function find({ id }: { id: any }): Promise<any> {
  return request(`/v1/backend/posts/${id}`, {});
}

export async function create({ data }: { data: any }): Promise<any> {
  return request(`/v1/backend/posts`, {
    method: 'post',
    data,
  });
}

export async function update({ id, data }: { id: any; data: any }): Promise<any> {
  return request(`/v1/backend/posts/${id}`, {
    method: 'put',
    data,
  });
}

export async function destroy({ id }: { id: any }): Promise<any> {
  return request(`/v1/backend/posts/${id}`, {
    method: 'delete',
  });
}

export async function bulkUpdate(data: any): Promise<any> {
  return request(`/v1/backend/posts/bulk`, {
    method: 'put',
    data,
  });
}

export async function bulkDestroy(data: any): Promise<any> {
  return request(`/v1/backend/posts/bulk`, {
    method: 'delete',
    data,
  });
}
