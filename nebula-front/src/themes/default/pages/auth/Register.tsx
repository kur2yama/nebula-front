import React, { useCallback, useEffect, useState } from 'react';
import { Link, history, useModel } from 'umi';
import { Button, Form, Input, Row, Col, notification, Alert } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import { PROJECT, URI } from '@/constants';
import { AUTH } from '@/dictionary';
import { PasswordChecker, CaptchaButton } from '@nebula/design';
import type { SiteType } from '@/types/site';
import styles from './style.less';

type RegisterProps = {
  currentSite: SiteType;
};

const Register: React.FC<RegisterProps> = (props) => {
  const { currentSite } = props;
  const { registerType } = currentSite.config.auth;
  const { sendCaptcha, register, loading } = useModel('useAuth');
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState<undefined | string>();
  const [currentPassword, setCurrentPassword] = useState('');

  useEffect(() => {
    if (currentSite && !currentSite.config.auth.allowRegister) {
      notification.error({ message: '还不允许注册' });
      history.replace('/auth/login');
    }
  }, [currentSite]);

  const renderCaptchaButton = useCallback(
    () => {
      if (!currentSite || !registerType) {
        return null;
      }

      const captchaType =
        currentSite.config.auth.registerType === 'username'
          ? 'image'
          : currentSite.config.auth.registerType;

      const handleSendCaptcha = (callback?: () => void) => {
        return form
          .validateFields([registerType])
          .then((values: any) => {
            return {
              [registerType]: values[registerType],
            };
          })
          .then((params) => {
            sendCaptcha(captchaType, params);
            if (callback) {
              callback();
            }
          })
          .catch((errorInfo) => {
            notification.error({ message: errorInfo.errorFields[0].errors[0] });
          });
      };

      return (
        <div className={styles.captchaButton}>
          <CaptchaButton
            buttonType="default"
            cacheName={`${PROJECT.code}:captcha`}
            imageUrl={`${URI.api}/v1/auth/captcha/image`}
            captchaType={captchaType}
            onClick={handleSendCaptcha}
          />
        </div>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSite, registerType],
  );

  const handleFormFinish = (values: any) => {
    register(values).then((res) => {
      if (res.success) {
        notification.success({ message: '恭喜你，注册成功!' });
        history.replace('/home');
      } else {
        setErrorMessage(res.message);
      }
    });
  };

  if (!currentSite || !registerType) {
    return <PageLoading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.siteName}>{currentSite.name}</div>
      <div className={styles.pageName}>用户注册</div>
      {errorMessage && (
        <Alert message={errorMessage} style={{ marginBottom: 16 }} type="error" showIcon />
      )}
      <Form form={form} onFinish={handleFormFinish}>
        <Form.Item name={registerType} rules={AUTH[registerType].rules as any}>
          <Input placeholder={AUTH[registerType].placeholder} autoComplete="new-password" />
        </Form.Item>
        {currentSite.config.auth.enableRegisterCaptcha && (
          <Form.Item>
            <Row gutter={16}>
              <Col span={14}>
                <Form.Item noStyle name="captcha" rules={AUTH.captcha.rules}>
                  <Input name="captcha" placeholder="验证码" autoComplete="new-password" />
                </Form.Item>
              </Col>
              <Col span={10}>{renderCaptchaButton()}</Col>
            </Row>
          </Form.Item>
        )}
        <PasswordChecker value={currentPassword}>
          <Form.Item name="password" rules={AUTH.password.rules as any}>
            <Input.Password
              placeholder="设置密码"
              autoComplete="new-password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Item>
        </PasswordChecker>
        <Form.Item
          name="confirm"
          rules={[
            { required: true, message: '请验证密码' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('两次输入的密码不一样');
              },
            }),
          ]}
        >
          <Input.Password placeholder="密码确认" autoComplete="new-password" />
        </Form.Item>

        <Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Button
                className={styles.submitButton}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                注册
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <div style={{ paddingTop: 8 }}>
                <Link to="/auth/login">使用已有账号登录</Link>
              </div>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
