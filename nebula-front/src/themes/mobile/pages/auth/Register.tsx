import React, { useCallback, useMemo } from 'react';
import { Link, useModel } from 'umi';
import { Button, Form, Input, Toast } from 'antd-mobile-v5';
import { PageLoading } from '@ant-design/pro-layout';
import { PROJECT, URI } from '@/constants';
import { AUTH, SITE } from '@/dictionary';
import { CaptchaButton } from '@nebula/design';
import styles from './style.less';
import WingSpace from '@/components/mobile/WingSpace';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { SiteType } from '@/types/site';
import { history } from '@@/core/history';

type RegisterProps = {
  currentSite: SiteType;
};

const Register: React.FC<RegisterProps> = (props) => {
  const { currentSite } = props;
  const { sendCaptcha, register, loading } = useModel('useAuth');
  const [form] = Form.useForm();
  const { registerType } = currentSite.config.auth;
  // const [errorMessage, setErrorMessage] = useState<undefined | string>();

  // useEffect(() => {
  //   if (currentSite && !currentSite.config.auth.allowRegister) {
  //     notification.error({ message: '还不允许注册' });
  //     history.replace('/auth/login');
  //   }
  // }, [currentSite]);

  // const handleSendCaptcha = useCallback(() => {
  //   const currentRegisterType = registerType || 'email';
  //   return form
  //     .validateFields([currentRegisterType])
  //     .then((values: any) => {
  //       return {
  //         [currentRegisterType]: values[currentRegisterType],
  //       };
  //     })
  //     .then((params) => {
  //       sendCaptcha(captchaType, params);
  //     });
  //
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [registerType, captchaType]);

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
            const errorMessage = errorInfo.errorFields[0].errors[0];
            Toast.fail({ content: errorMessage });
            throw Error(errorMessage);
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
        Toast.success({ content: '恭喜你，注册成功!' });
        history.replace('/home');
      } else {
        // setErrorMessage(res.message);
      }
    });
  };

  if (!currentSite || !registerType) {
    return <PageLoading />;
  }

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
        form={form}
        layout="horizontal"
        onFinish={handleFormFinish}
        footer={
          <Button
            className={styles.submitButton}
            color="primary"
            type="submit"
            block
            loading={loading}
          >
            注册
          </Button>
        }
      >
        <Form.Item
          label={registerLabel}
          name={registerType}
          rules={AUTH[registerType].rules as any}
        >
          <Input placeholder={AUTH[registerType].placeholder} autoComplete="new-password" />
        </Form.Item>
        {currentSite.config.auth.enableRegisterCaptcha && (
          <Form.Item
            label="验证码"
            name="captcha"
            rules={AUTH.captcha.rules}
            style={{ position: 'relative' }}
          >
            <Input name="captcha" placeholder="验证码" autoComplete="new-password" />

            {renderCaptchaButton()}
          </Form.Item>
        )}
        <Form.Item label="密码" name="password" rules={AUTH.password.rules as any}>
          <Input placeholder="请设置密码" autoComplete="new-password" type="password" />
        </Form.Item>
        <Form.Item
          label="确认密码"
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
          <Input placeholder="请密码确认" autoComplete="new-password" type="password" />
        </Form.Item>
      </Form>
      <WingSpace>
        <div style={{ paddingTop: 8, textAlign: 'right' }}>
          <Link to="/auth/login">使用已有账号登录</Link>
        </div>
      </WingSpace>
    </div>
  );
};

export default Register;
