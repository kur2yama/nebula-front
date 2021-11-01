import React from 'react';
import { useModel } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { Alert, Card, Col, Row } from 'antd';
import PublicBreadcrumb from '@/themes/default/components/PublicBreadcrumb';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';

type MyHomeProps = {
  currentSite: SiteType;
  route: Route;
};

const MyHome: React.FC<MyHomeProps> = ({ route }) => {
  const { initialState } = useModel('@@initialState');
  if (!initialState || !initialState.currentUser) {
    return <PageLoading />;
  }

  return (
    <div>
      <PublicBreadcrumb routes={[{ path: '/my', name: '我的' }, route]} />
      <Alert message="请修改密码" type="warning" showIcon closable style={{ marginBottom: 16 }} />
      <Row gutter={16}>
        <Col span={12}>
          <Card title="我的评论">我的评论</Card>
        </Col>
        <Col span={12}>
          <Card title="我的点赞">我的点赞</Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyHome;
