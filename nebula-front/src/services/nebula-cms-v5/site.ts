// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 取站点某站点详情 GET /v1/sites/${param0} */
export async function getSite(
  params: {
    // path
    /** 站点ID */
    id: string;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{ message?: string; code?: number; data?: API.SiteType }>(`/v1/sites/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
