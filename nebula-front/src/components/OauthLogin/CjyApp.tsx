import React from 'react';
import { Avatar, message as antMessage } from 'antd';
import { URI } from '@/constants';
import { stringify } from 'qs';

interface CjyAppProps {
  params?: any;
}

const CjyApp: React.FC<CjyAppProps> = (props) => {
  const { params = {} } = props;
  const oauthBaseUrl = `${URI.api}/v1/oauth/cjy/login`;

  const getUserInfoCallback = (openId: string) => {
    const query = {
      ...params,
      openId,
      redirect: `${URI.root}/oauth/login`,
    };

    window.location.href = `${oauthBaseUrl}?${stringify(query)}`;
  };

  const handleClick = () => {
    const { mc } = window as any;
    if (!mc) {
      antMessage.warning('请先加载mc.js').then();
    } else {
      if (!mc.isClient()) {
        antMessage.warning('请从长江云App登录').then();
        // notification.warning({ message: '错误', description: '请从长江云App登录' });
        return;
      }
      if (mc.isClient()) {
        antMessage.info('正在登录...').then(() => {
          mc.userGetInfo((userRes: { state: boolean; data?: { id: string } }) => {
            if (userRes.state && userRes.data) {
              getUserInfoCallback(userRes.data.id);
            } else {
              mc.userLogin((loginRes: { state: boolean; data?: { id: string } }) => {
                if (loginRes.state && loginRes.data) {
                  getUserInfoCallback(loginRes.data.id);
                }
              });
            }
          });
        });
      }
    }
  };

  return (
    <a onClick={handleClick}>
      <Avatar shape="square" src="https://static.hbtv.com.cn/nebula/cjy-red.svg" size={24} />
    </a>
  );
};

export default CjyApp;
