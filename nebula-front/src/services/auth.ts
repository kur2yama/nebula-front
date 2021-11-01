import { request } from 'umi';

export async function login(data: any): Promise<any> {
  return request(`/v1/auth/login`, {
    method: 'POST',
    data,
  });
}

export async function register(data: any): Promise<any> {
  return request(`/v1/auth/register`, {
    method: 'POST',
    data,
  });
}

export async function getProfile(token?: string) {
  return request(`/v1/auth/profile`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });
}

export async function updateProfile(data: any): Promise<any> {
  return request(`/v1/auth/profile`, {
    method: 'PUT',
    data,
  });
}

export async function changePassword(data: any): Promise<any> {
  return request(`/v1/auth/password`, {
    method: 'PUT',
    data,
  });
}

export async function captcha(type: string, data: any) {
  return request(`/v1/auth/captcha/${type}`, {
    method: 'POST',
    data,
  });
}

export async function resetPassword(data: any) {
  return request(`/v1/auth/password`, {
    method: 'POST',
    data,
  });
}
