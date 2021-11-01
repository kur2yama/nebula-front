import React, { useEffect } from 'react';
import { history } from 'umi';
import { notification, Result } from 'antd';

const OauthLogin: React.FC = () => {
  useEffect(() => {
    if (!history.location.query?.token) {
      notification.error({ message: '登录失败了' });
      history.replace('/auth/login');
    } else {
      // TODO 获取用户信息并跳转到 首页
      // dispatch({
      //   type: 'auth/getProfile',
      //   payload: history.location.query,
      //   callback: () => {
      //     history.replace('/');
      //   },
      // });
    }
  }, []);

  return <Result status="success" title="登录成功" subTitle="正在跳转，请稍后..." />;
};

export default OauthLogin;
