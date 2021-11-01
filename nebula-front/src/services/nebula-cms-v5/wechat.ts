// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取wechat jssdk config GET /v1/wechat/js/config */
export async function getWechatJsSdkConfig(
  params: {
    // query
    /** 需要签名的url */
    url: string;
    // path
  },
  options?: { [key: string]: any },
) {
  const { ...queryParams } = params;
  return request<{ message?: string; code?: number; data?: API.WechatJSSdkConfigType }>(
    '/v1/wechat/js/config',
    {
      method: 'GET',
      params: {
        ...queryParams,
      },
      ...(options || {}),
    },
  );
}
