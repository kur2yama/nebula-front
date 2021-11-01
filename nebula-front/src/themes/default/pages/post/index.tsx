import React from 'react';
import { Card, Col, Row } from 'antd';
import SharePanel from './components/SharePanel';
import PostInfo from './components/PostInfo';
import Gallery from './components/Gallery';
import Attachment from './components/Attachment';
import PublicBreadcrumb from '@/themes/default/components/PublicBreadcrumb';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';
import type { PostType } from '@/types/post';
import styles from './style.less';

type PostPageProps = {
  currentSite: SiteType;
  route: Route;
  data: PostType;
};

const PostPage: React.FC<PostPageProps> = (props) => {
  const { data } = props;

  return (
    <div className={styles.container}>
      <PublicBreadcrumb
        routes={[
          { path: `/category?id=${data.categoryId}`, name: data.category.name },
          { path: `/post?id=${data.id}`, name: data.title },
        ]}
      />
      <Row gutter={16}>
        <Col span={18}>
          <Card
            title={data.title}
            extra={<SharePanel data={data} />}
            bodyStyle={{ paddingBottom: 128 }}
          >
            <PostInfo data={data} />
            <Gallery data={data.gallery} />
            <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
            <Attachment data={data.attachment} />
          </Card>
        </Col>
        <Col span={6}>
          <aside style={{ marginBottom: 16 }}>
            <Card title="热门文章">热门文章</Card>
          </aside>
          <aside>
            <Card title="标签云">标签云</Card>
          </aside>
        </Col>
      </Row>
    </div>
  );
};

export default PostPage;
