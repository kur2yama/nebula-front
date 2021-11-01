import React from 'react';
import { Link, useModel } from 'umi';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Space } from 'antd-mobile-v5';
import WingSpace from '@/components/mobile/WingSpace';
import { AUTH } from '@/dictionary';
import type { SiteType } from '@/types/site';
import styles from './style.less';
import Wechat from '@/components/OauthLogin/Wechat';
import CjyApp from '@/components/OauthLogin/CjyApp';

export type LoginProps = {
  currentSite: SiteType;
};

const Login: React.FC<LoginProps> = (props) => {
  const { currentSite } = props;

  const { loginType, allowedOauth, allowRegister, allowFindPassword } = currentSite.config.auth;
  const auth = useModel('useAuth');

  const renderRegisterLink = () => {
    if (allowRegister) {
      return <Link to="/auth/register">没有账户，现在注册</Link>;
    }
    return null;
  };

  const renderFindPassword = () => {
    if (allowFindPassword) {
      return <Link to="/auth/password">忘记密码？</Link>;
    }
    return null;
  };

  const renderOauth = () => {
    if (allowedOauth && allowedOauth.length > 0) {
      return (
        <>
          <Divider>第三方登录</Divider>
          <div className={styles.oauthIcons}>
            <Space>
              {allowedOauth.map((oauth) => {
                switch (oauth) {
                  case 'wechat':
                    return <Wechat key="oauth-wechat" />;
                  case 'cjy':
                    return <CjyApp key="oauth-cjy" />;
                  default:
                    return null;
                }
              })}
            </Space>
          </div>
        </>
      );
    }

    return null;
  };
  return (
    <div className={styles.container}>
      <WingSpace className={styles.header}>
        <div className={styles.backButton}>
          <Link to="/home">
            <ArrowLeftOutlined />
          </Link>
        </div>

        <div className={styles.title}>用户登录</div>
      </WingSpace>
      <Form
        onFinish={auth.login}
        footer={
          <Button type="submit" color="primary" block>
            登录
          </Button>
        }
      >
        <Form.Item label="账户" name="account" rules={AUTH[loginType].rules as any}>
          <Input placeholder={AUTH[loginType].placeholder} clearable />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={AUTH.password.rules as any}>
          <Input placeholder="请输入密码" clearable type="password" />
        </Form.Item>
      </Form>

      <WingSpace>
        <div className={styles.extraLink}>
          {renderFindPassword()}
          {renderRegisterLink()}
        </div>
      </WingSpace>
      {renderOauth()}
    </div>
  );
};

export default Login;
