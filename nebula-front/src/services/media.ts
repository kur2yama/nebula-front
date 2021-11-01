import { request } from 'umi';
import { getToken } from '@/utils';
import { URI } from '@/constants';

export async function search(params: any): Promise<any> {
  return request('/v1/backend/medias', {
    params,
  });
}

export async function upload(
  data: FormData,
  onProgress?: (evt: ProgressEvent) => void,
): Promise<any> {
  const url = `${URI.api}/v1/backend/medias`;
  return new Promise((resolve, reject) => {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('post', url);
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(JSON.parse(xhr.responseText));
      }
    };
    xhr.onerror = reject;
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress;
    }

    xhr.send(data);
  });
}

export async function find({ id }: { id: number | string }): Promise<any> {
  return request(`/v1/backend/medias/${id}`, {
    method: 'get',
  });
}

export async function token(data: any): Promise<any> {
  return request(`/v1/backend/medias/token`, {
    method: 'post',
    data,
  });
}

export async function destroy({ id }: { id: number }): Promise<any> {
  return request(`/v1/backend/medias/${id}`, {
    method: 'delete',
  });
}

export async function bulkDestroy(data: any): Promise<any> {
  return request('/v1/backend/medias/bulk', {
    method: 'delete',
    data,
  });
}
