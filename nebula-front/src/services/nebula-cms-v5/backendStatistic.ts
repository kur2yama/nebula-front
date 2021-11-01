// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取统计 GET /v1/backend/statistic/welcome */
export async function getBackendStatistic(
  params: {
    // path
  },
  options?: { [key: string]: any },
) {
  const { ...queryParams } = params;
  return request<{
    message?: string;
    code?: number;
    data?: { total?: { users?: number; posts?: number; pageViews?: number } };
  }>('/v1/backend/statistic/welcome', {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
