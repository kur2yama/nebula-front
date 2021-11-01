import { useState, useCallback } from 'react';
import { useModel, history } from 'umi';
import { useRequest } from 'ahooks';
import * as authServices from '@/services/auth';
import { clearTokenData, setTokenData } from '@/utils';
import { stringify } from 'querystring';
import type { ResponseType } from '@/types/global';
import { message } from 'antd';

const loginPath = '/auth/login';

export type UseAuthProps = {
  /** 用户登录 */
  login: (params: any) => Promise<any>;
  /** 用户注册 */
  register: (params: any) => Promise<any>;
  /** 获取并保存用户信息 */
  getProfile: (token: string, redirectTo: boolean) => void;
  /** 用户退出 */
  logout: () => Promise<void>;
  /** 更新用户信息 */
  updateProfile: (params: any) => Promise<any>;
  /** 用户修改密码 */
  changePassword: (params: any) => Promise<any>;
  /** 重置密码 */
  resetPassword: (params: any) => Promise<any>;
  /** 重置密码 */
  sendCaptcha: (captchaType: string, params: any) => Promise<any>;
  /** 错误信息 */
  errorMessage?: string;
  /** 状态 */
  loading?: boolean;
};

export default function useAuth(): UseAuthProps {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [errorMessage, setErrorMessage] = useState<string>();
  const loginRequest = useRequest(authServices.login, { manual: true });
  const registerRequest = useRequest(authServices.register, { manual: true });
  const profileRequest = useRequest(authServices.updateProfile, { manual: true });
  const passwordRequest = useRequest(authServices.changePassword, { manual: true });
  const resetPasswordRequest = useRequest(authServices.resetPassword, { manual: true });
  const sendCaptchaRequest = useRequest(authServices.captcha, { manual: true });

  const getProfile = useCallback(
    async (token: string, redirectTo: boolean = false) => {
      const currentUser = await initialState?.fetchCurrentUser?.(token);
      if (currentUser) {
        await setInitialState((s) => ({
          ...s,
          isLoggedIn: true,
          currentUser: currentUser?.data,
        }));

        if (redirectTo) {
          // 跳转到redirect url
          const { query } = history.location;
          const { redirect } = query as { redirect: string };

          setTimeout(() => {
            if (redirect !== loginPath) {
              history.replace(redirect || '/home');
            }
          }, 20);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialState],
  );

  const login = useCallback(
    async (params: any) => {
      setErrorMessage(undefined);
      const res: ResponseType = await loginRequest.run(params);
      if (res) {
        if (!res.success) {
          setErrorMessage(res.message);
        } else {
          setErrorMessage(undefined);
          setTokenData(res.data);
          await getProfile(res.data.token, true);
        }
      } else {
        setErrorMessage('未知错误');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialState],
  );

  const register = useCallback(async (params: any) => {
    const res: ResponseType = await registerRequest.run(params);
    if (res.success) {
      // 保存 token 到 localstorage
      setTokenData(res.data);
      await getProfile(res.data.token, true);
    }
    return res;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(async () => {
    clearTokenData();
    setErrorMessage(undefined);
    await setInitialState((s) => ({
      ...s,
      isLoggedIn: false,
      currentUser: undefined,
    }));

    const { pathname } = history.location;

    if (pathname !== loginPath) {
      history.replace({
        pathname: loginPath,
        search: stringify({
          redirect: pathname,
        }),
      });
    }
  }, [setInitialState]);

  const updateProfile = useCallback(
    async (params: any) => {
      const res: ResponseType = await profileRequest.run(params);
      if (res && res.success) {
        const currentUser = await initialState?.fetchCurrentUser?.();
        await setInitialState((s) => ({
          ...s,
          currentUser: currentUser?.data,
        }));
      }
      return res;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialState],
  );

  const changePassword = useCallback(
    async (params: any) => {
      const res: ResponseType = await passwordRequest.run(params);
      if (res && res.success) {
        await logout();
      }
      return res;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const resetPassword = useCallback(
    async (params: any) => {
      setErrorMessage(undefined);
      const res = await resetPasswordRequest.run(params);
      if (res && res.success) {
        message.success(res.message);
        // 跳转到登录页
        history.replace('/auth/login');
      } else {
        setErrorMessage(res.message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const sendCaptcha = useCallback(
    async (captchaType, params) => {
      const res = await sendCaptchaRequest.run(captchaType, params);
      if (res && res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    login,
    logout,
    register,
    updateProfile,
    changePassword,
    errorMessage,
    getProfile,
    resetPassword,
    sendCaptcha,
    loading:
      loginRequest.loading ||
      profileRequest.loading ||
      passwordRequest.loading ||
      registerRequest.loading,
  };
}
