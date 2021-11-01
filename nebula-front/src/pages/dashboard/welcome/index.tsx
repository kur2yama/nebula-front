import React from 'react';
import moment from 'moment';
import { Link } from 'umi';
import { useRequest } from 'ahooks';
import { Avatar, Button, Card, Col, List, notification, Row, Statistic } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { PostType } from '@/types/post';
import type { UserType } from '@/types/user';
import * as services from '@/services/statistic';

const Welcome: React.FC = () => {
  const welcome = useRequest(services.welcome, { formatResult: (res) => res.data });
  const clearCache = useRequest(services.clearCache, {
    manual: true,
  });

  const handleClearCache = () => {
    clearCache.run().then(() => {
      notification.success({ message: '清除缓存成功' });
      welcome.refresh();
    });
  };

  // console.log('testReq', testReq.data);

  return (
    <PageContainer
      loading={welcome.loading}
      extra={
        <Button type="link" onClick={handleClearCache}>
          清除缓存
        </Button>
      }
    >
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic title="用户" value={welcome.data?.total.users} suffix="人" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="文章" value={welcome.data?.total.posts} suffix="篇" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="访问量" value={welcome.data?.total.pageViews} suffix="人次" />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="最新文章" extra={<Link to="/backend/content/post">更多</Link>}>
            <List<PostType>
              pagination={false}
              dataSource={welcome.data?.newly.posts}
              renderItem={(item) => (
                <List.Item extra={moment(item.publishedAt).format('YYYY-MM-DD')}>
                  <List.Item.Meta
                    title={item.title}
                    avatar={<Avatar src={item.cover} shape="square" />}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="最新注册用户" extra={<Link to="/backend/system/user">更多</Link>}>
            <List<UserType>
              pagination={false}
              dataSource={welcome.data?.newly.users}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta title={item.nickname} avatar={<Avatar src={item.avatar} />} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Welcome;
