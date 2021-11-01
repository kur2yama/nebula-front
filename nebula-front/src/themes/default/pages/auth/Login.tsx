import React, { useMemo } from 'react';
import { Link, useModel } from 'umi';
import { Alert, Button, Col, Form, Input, Row, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import CjyApp from '@/components/OauthLogin/CjyApp';
import Wechat from '@/components/OauthLogin/Wechat';
import { AUTH } from '@/dictionary';
import type { SiteType } from '@/types/site';
import styles from './style.less';

type LoginProps = {
  currentSite: SiteType;
};

const Login: React.FC<LoginProps> = (props) => {
  const { currentSite } = props;
  const { loginType, allowedOauth, allowRegister, allowFindPassword } = currentSite.config.auth;
  const { initialState } = useModel('@@initialState');
  const auth = useModel('useAuth');

  const loginAlert = useMemo(() => {
    if (initialState?.isLoggedIn || !auth.errorMessage) {
      return null;
    }
    return <Alert message={auth.errorMessage} style={{ marginBottom: 16 }} type="error" showIcon />;
  }, [initialState?.isLoggedIn, auth.errorMessage]);

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
        <Space style={{ marginTop: 16 }}>
          <span>第三方登录：</span>
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
      );
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.siteName}>{currentSite.name}</div>
      <div className={styles.pageName}>用户登录</div>
      {loginAlert}
      <Form onFinish={auth.login}>
        <Form.Item name="account" rules={AUTH[loginType].rules as any}>
          <Input
            prefix={<UserOutlined className={styles.icon} />}
            placeholder={AUTH[loginType].placeholder}
            allowClear
          />
        </Form.Item>
        <Form.Item name="password" rules={AUTH.password.rules as any}>
          <Input.Password
            prefix={<LockOutlined className={styles.icon} />}
            placeholder={AUTH.password.placeholder}
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button
            className={styles.submitButton}
            type="primary"
            htmlType="submit"
            loading={auth.loading}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <Row gutter={6}>
        <Col span={12}>{renderFindPassword()} </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          {renderRegisterLink()}
        </Col>
      </Row>
      {renderOauth()}
    </div>
  );
};

export default Login;
