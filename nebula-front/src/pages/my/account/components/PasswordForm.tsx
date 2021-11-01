import { useState } from 'react';
import { useModel } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { Button, Input } from 'antd';
import { ProForm } from '@nebula/pro-form';
import { PasswordChecker } from '@nebula/design';

const PasswordForm = () => {
  const { initialState } = useModel('@@initialState');
  const { changePassword, loading } = useModel('useAuth');
  const [currentPassword, setCurrentPassword] = useState('');

  if (!initialState || !initialState.currentUser) {
    return <PageLoading />;
  }

  return (
    <>
      <ProForm
        layout="vertical"
        wrapperCol={{ offset: 3, span: 8 }}
        labelCol={{ offset: 3, span: 8 }}
        onFinish={changePassword}
      >
        <ProForm.Item>
          <h3>修改密码</h3>
        </ProForm.Item>
        <ProForm.Item
          name="oldPassword"
          label="原密码"
          rules={[{ required: true, message: '请输入原密码' }]}
        >
          <Input.Password placeholder="请输入原密码" autoComplete="new-password" />
        </ProForm.Item>
        <PasswordChecker value={currentPassword}>
          <ProForm.Item
            name="password"
            label="新密码"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input.Password
              placeholder="请设置新密码"
              autoComplete="new-password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </ProForm.Item>
        </PasswordChecker>
        <ProForm.Item
          name="confirm"
          label="密码确认"
          rules={[
            { required: true, message: '请确认新密码' },
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
          dependencies={['password']}
        >
          <Input.Password placeholder="请确认新密码" autoComplete="new-password" />
        </ProForm.Item>
        <ProForm.Item wrapperCol={{ offset: 3 }}>
          <Button type="primary" htmlType="submit" loading={loading} size="large">
            保存
          </Button>
        </ProForm.Item>
      </ProForm>
    </>
  );
};

export default PasswordForm;
