import React, { useCallback, useState } from 'react';
import { history, Link, useModel } from 'umi';
import { Alert, Button, Col, Form, Input, notification, Row } from 'antd';
import { AUTH } from '@/dictionary';
import { CaptchaButton, PasswordChecker } from '@nebula/design';
import { PROJECT, URI } from '@/constants';
import type { SiteType } from '@/types/site';
import styles from './style.less';

type FindPasswordProps = {
  currentSite: SiteType;
};

const FindPassword: React.FC<FindPasswordProps> = (props) => {
  const { currentSite } = props;
  const { registerType } = currentSite.config.auth;
  const { resetPassword, sendCaptcha, loading, errorMessage } = useModel('useAuth');
  const [form] = Form.useForm();
  const [currentPassword, setCurrentPassword] = useState('');

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
    resetPassword(values);
  };

  if (!currentSite || !currentSite.config.auth.allowFindPassword) {
    notification.error({ message: '?????????????????????' });

    history.replace('/auth/login');
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.siteName}>{currentSite.name}</div>
      <div className={styles.pageName}>????????????</div>
      {errorMessage && (
        <Alert message={errorMessage} style={{ marginBottom: 16 }} type="error" showIcon />
      )}
      <Form form={form} onFinish={handleFormFinish}>
        <Form.Item name={registerType} rules={AUTH[registerType].rules as any}>
          <Input placeholder={AUTH[registerType].placeholder} autoComplete="new-password" />
        </Form.Item>
        <Form.Item>
          <Row gutter={16}>
            <Col span={14}>
              <Form.Item noStyle name="captcha" rules={AUTH.captcha.rules}>
                <Input name="captcha" placeholder="?????????" autoComplete="new-password" />
              </Form.Item>
            </Col>
            <Col span={10}>{renderCaptchaButton()}</Col>
          </Row>
        </Form.Item>
        <PasswordChecker value={currentPassword}>
          <Form.Item name="password" rules={AUTH.password.rules as any}>
            <Input.Password
              placeholder="????????????"
              autoComplete="new-password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Item>
        </PasswordChecker>
        <Form.Item
          name="confirm"
          rules={[
            { required: true, message: '???????????????' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('??????????????????????????????');
              },
            }),
          ]}
        >
          <Input.Password placeholder="????????????" autoComplete="new-password" />
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
                ????????????
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <div style={{ paddingTop: 8 }}>
                <Link to="/auth/login">????????????</Link>
              </div>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FindPassword;
