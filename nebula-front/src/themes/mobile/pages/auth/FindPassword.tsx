import React, { useCallback, useMemo } from 'react';
import { Link, useModel } from 'umi';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Toast } from 'antd-mobile-v5';
import WingSpace from '@/components/mobile/WingSpace';
import { AUTH, SITE } from '@/dictionary';
import { CaptchaButton } from '@nebula/design';
import { PROJECT, URI } from '@/constants';
import type { SiteType } from '@/types/site';
import styles from './style.less';

type FindPasswordProps = {
  currentSite: SiteType;
};

const FindPassword: React.FC<FindPasswordProps> = (props) => {
  const { currentSite } = props;
  const { resetPassword, sendCaptcha, loading } = useModel('useAuth');
  const [form] = Form.useForm();
  const { registerType } = currentSite.config.auth;

  const registerLabel = useMemo(() => {
    const foundRegister = SITE.registerType.find((item) => item.value === registerType);
    return foundRegister ? foundRegister.label : undefined;
  }, [registerType]);

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
            Toast.fail({ content: errorInfo.errorFields[0].errors[0] });
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

  return (
    <div className={styles.container}>
      <WingSpace className={styles.header}>
        <div className={styles.backButton}>
          <Link to="/home">
            <ArrowLeftOutlined />
          </Link>
        </div>

        <div className={styles.title}>????????????</div>
      </WingSpace>
      <Form form={form} onFinish={handleFormFinish}>
        <Form.Item
          label={registerLabel}
          name={registerType}
          rules={AUTH[registerType].rules as any}
        >
          <Input placeholder={AUTH[registerType].placeholder} autoComplete="new-password" />
        </Form.Item>
        <Form.Item label="?????????">
          <Form.Item noStyle name="captcha" rules={AUTH.captcha.rules}>
            <Input name="captcha" placeholder="?????????" autoComplete="new-password" />
          </Form.Item>
          {renderCaptchaButton()}
        </Form.Item>
        <Form.Item label="??????" name="password" rules={AUTH.password.rules as any}>
          <Input type="password" placeholder="????????????" autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          label="????????????"
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
          <Input placeholder="????????????" autoComplete="new-password" type="password" />
        </Form.Item>
      </Form>

      <WingSpace style={{ paddingTop: 16 }}>
        <Button
          className={styles.submitButton}
          color="primary"
          type="submit"
          loading={loading}
          block
        >
          ????????????
        </Button>
        <div style={{ marginTop: 8, textAlign: 'right' }}>
          <Link to="/auth/login">????????????</Link>
        </div>
      </WingSpace>
    </div>
  );
};

export default FindPassword;
