import { message, notification } from 'antd';
import moment from 'moment';
import request from 'umi-request';
import { history } from 'umi';
import { PROJECT, URI } from '@/constants';
import type { RequestInterceptor, ResponseInterceptor } from 'umi-request';
import type { ResponseType, TokenType } from '@/types/global';

const getCacheName = () => {
  return `${PROJECT.code}:auth`;
};

export const clearTokenData = () => {
  const cacheName = getCacheName();
  localStorage.removeItem(cacheName);
};

// 存储 token 到 本地存储
export const setTokenData = (data: TokenType) => {
  const cacheName = getCacheName();
  localStorage.setItem(cacheName, JSON.stringify(data));
};

// 从 本地存储 获取 token
export const getTokenData = () => {
  const cacheName = getCacheName();
  const cacheData = localStorage.getItem(cacheName);
  return cacheData ? (JSON.parse(cacheData) as TokenType) : undefined;
};

export const getToken = () => {
  const tokenResponse = getTokenData();
  return tokenResponse ? tokenResponse.token : '';
};

export function validURL(str: string) {
  const pattern = new RegExp(
    '^((https|http)?://)' +
      "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + // ftp的user@
      '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
      '|' + // 允许IP和DOMAIN（域名）
      "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
      '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
      '[a-z]{2,6})' + // first level domain- .com or .museum
      '(:[0-9]{1,4})?', // 端口- :80
  );
  return pattern.test(str);
}

/**
 * 请求错误的处理
 * @param error
 */
export const responseErrorHandle = async (error: any): Promise<any> => {
  const { response } = error;

  if (!response) {
    history.push('/timeout');
    return error;
  }
  if (response.status === 401) {
    clearTokenData();
    history.replace('/auth/login');
  }
  if (response.status === 504) {
    history.replace('/exception/timeout');
  }

  throw error;
};

/**
 * 请求拦截
 * @param url
 * @param options
 */
export const urlAndTokenRequestInterceptor: RequestInterceptor = (url, options) => {
  // 检查是否是完整 url 否则添加前缀
  const fixedUrl = validURL(url) ? url : `${URI.api}${url}`;
  //  获取头部 并添加本地 token 到 header Authorization
  const { headers = {}, ...restOptions } = options;
  const tokenData = getTokenData();

  const newHeaders = (() => {
    if (!(headers as Record<string, any>).Authorization && tokenData) {
      return {
        ...headers,
        Authorization: `Bearer ${tokenData.token}`,
        TokenExpiredAt: `${tokenData.expiredAt}`,
      };
    }
    return headers;
  })();

  return {
    url: fixedUrl,
    options: { ...restOptions, headers: newHeaders },
  };
};

export const responseMessageInterceptor: ResponseInterceptor = async (response) => {
  const res = await response.clone().json();
  if (res) {
    const { success, showType = 'silent' } = res as ResponseType;
    switch (showType) {
      case 'warn':
        message.warn(res.message);
        break;
      case 'error':
        notification.error({ message: res.message });
        break;
      case 'notification':
        if (success) {
          notification.success({ message: res.message });
        } else {
          notification.error({ message: res.message });
        }
        break;
      default:
        break;
    }
  }

  return response;
};

export const refreshTokenMiddleware = async (ctx: any, next: () => void) => {
  const { headers = {} } = ctx.req.options;
  const { Authorization, TokenExpiredAt } = headers;

  if (TokenExpiredAt && moment().unix() > parseInt(TokenExpiredAt, 10)) {
    const { success, data } = await request(`${URI.api}/v1/auth/refresh`, {
      method: 'POST',
      headers: { Authorization: `${Authorization}` },
    });

    if (success) {
      // 更新本地存储的token
      setTokenData(data);
      // 重新设置请求的 Authorization
      ctx.req.options.headers = { Authorization: `Bearer ${data.token}` };
    } else {
      // 如果不能刷新 这情况本地保存的token
      clearTokenData();
      history.replace('/');
    }
  }

  await next();
};

export function getWidth() {
  const width = document.documentElement.clientWidth / 2;
  return width < 600 ? document.documentElement.clientWidth : width;
}
