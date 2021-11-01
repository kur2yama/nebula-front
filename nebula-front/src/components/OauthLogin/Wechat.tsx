import React from 'react';
import { WechatOutlined } from '@ant-design/icons';
import { URI } from '@/constants';
import { Avatar } from 'antd';
import { stringify } from 'qs';

interface WechatProps {
  params?: any;
}

const Wechat: React.FC<WechatProps> = (props) => {
  const { params } = props;
  const oauthBaseUrl = `${URI.api}/v1/oauth/wechat/login`;
  const query = {
    ...params,
    redirect: `${URI.root}/oauth/login`,
  };
  const currentOauthUrl = `${oauthBaseUrl}?${stringify(query)}`;
  return (
    <a key="oauth-wechat" href={currentOauthUrl}>
      <Avatar
        icon={<WechatOutlined style={{ color: '#fff', fontSize: 16 }} />}
        size={28}
        style={{ background: '#62b900' }}
      />
    </a>
  );
};

export default Wechat;
