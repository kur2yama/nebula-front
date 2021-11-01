import { request } from 'umi';

export async function search(params: any): Promise<any> {
  return request(`/v1/document/pages`, {
    params,
  });
}

export async function menu(): Promise<any> {
  return request(`/v1/document/menu`, {});
}

export async function find(pageId: any): Promise<any> {
  return request(`/v1/document/pages/${pageId}`, {});
}
