import { PageLoading } from '@ant-design/pro-layout';
import {
  responseErrorHandle,
  refreshTokenMiddleware,
  urlAndTokenRequestInterceptor,
  responseMessageInterceptor,
  getToken,
} from '@/utils';
import Exception403 from '@/pages/exception/403';
import * as siteServices from '@/services/site';
import * as authServices from '@/services/auth';

import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import type { InitialStateType } from '@/types/global';

// const isDev = process.env.NODE_ENV === 'development';
// const loginPath = '/auth/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): InitialStateType {
  // TODO 如果有多个站点 也可以再这里判断 pathname 来获取不同站点的设置
  // 初始化时直接获取站点设置
  const currentSite = await siteServices.find();
  // 从 localStorage 中获取token
  const token = getToken();
  const currentUser = token ? await authServices.getProfile(token) : undefined;

  return {
    landingUrl: window.location.href,
    currentSite: currentSite ? currentSite.data : undefined,
    currentUser: currentUser ? currentUser.data : undefined,
    isLoggedIn: !!currentUser,
    fetchCurrentSite: siteServices.find,
    fetchCurrentUser: authServices.getProfile,
    settings: {},
  };
}

export const request: RequestConfig = {
  timeout: 10000,
  middlewares: [refreshTokenMiddleware],
  requestInterceptors: [urlAndTokenRequestInterceptor],
  responseInterceptors: [responseMessageInterceptor],
  errorHandler: responseErrorHandle,
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    // disableContentMargin: false,
    // menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <Exception403 />,
    ...initialState?.settings,
  };
};
