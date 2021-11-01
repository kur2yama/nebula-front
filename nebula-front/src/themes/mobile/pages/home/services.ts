import { request } from 'umi';

export async function fetch(): Promise<any> {
  return request('/v1/content/9');
}
