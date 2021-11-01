import React, { useMemo, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Menu, Row } from 'antd';
import ProfileForm from '@/pages/my/account/components/ProfileForm';
import PasswordForm from '@/pages/my/account/components/PasswordForm';

const MyAccount: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('profile');

  const currentForm = useMemo(() => {
    if (selectedKey === 'profile') {
      return <ProfileForm />;
    }
    if (selectedKey === 'password') {
      return <PasswordForm />;
    }

    return null;
  }, [selectedKey]);

  return (
    <PageContainer>
      <Card>
        <Row gutter={16}>
          <Col span={4}>
            <Menu mode="inline" selectedKeys={[selectedKey]} onClick={(e) => setSelectedKey(e.key)}>
              <Menu.Item key="profile">个人信息</Menu.Item>
              <Menu.Item key="password">修改密码</Menu.Item>
            </Menu>
          </Col>
          <Col span={20}>{currentForm}</Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default MyAccount;
