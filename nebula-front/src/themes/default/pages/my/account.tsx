import React, { useState } from 'react';
import { useModel } from 'umi';
import { Button, Form, Input } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import { PasswordChecker } from '@nebula/design';
import PublicBreadcrumb from '@/themes/default/components/PublicBreadcrumb';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';

type MyAccountProps = {
  currentSite: SiteType;
  route: Route;
};

const MyAccount: React.FC<MyAccountProps> = ({ route }) => {
  const { initialState } = useModel('@@initialState');
  const { changePassword, loading } = useModel('useAuth');
  const [currentPassword, setCurrentPassword] = useState('');

  if (!initialState || !initialState.currentUser) {
    return <PageLoading />;
  }

  return (
    <>
      <PublicBreadcrumb routes={[{ path: '/my', name: '我的' }, route]} />
      <div>
        <Form wrapperCol={{ span: 8 }} labelCol={{ span: 6 }} onFinish={changePassword}>
          <Form.Item
            name="oldPassword"
            label="原密码"
            rules={[{ required: true, message: '请输入原密码' }]}
          >
            <Input.Password placeholder="请输入原密码" autoComplete="new-password" />
          </Form.Item>
          <PasswordChecker value={currentPassword}>
            <Form.Item
              name="password"
              label="新密码"
              rules={[{ required: true, message: '请输入新密码' }]}
            >
              <Input.Password
                placeholder="请设置新密码"
                autoComplete="new-password"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Item>
          </PasswordChecker>
          <Form.Item
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
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default MyAccount;
