import React from 'react';
import { history } from 'umi';
import { Card, List } from 'antd';
import PostInfo from '@/themes/default/pages/post/components/PostInfo';
import PublicBreadcrumb from '@/themes/default/components/PublicBreadcrumb';
import type { SiteType } from '@/types/site';
import type { PaginationType } from '@/types/global';
import type { Route } from '@ant-design/pro-layout/es/typings';
import type { PostType } from '@/types/post';
import type { PostCategoryType } from '@/types/postCategory';
import styles from './style.less';

export type PostCategoryProps = {
  currentSite: SiteType;
  route: Route;
  category?: PostCategoryType;
  posts?: PostType[];
  pagination?: PaginationType;
};

const PostCategory: React.FC<PostCategoryProps> = (props) => {
  const { category, posts, pagination } = props;

  return (
    <div className={styles.container}>
      <PublicBreadcrumb routes={[{ path: `/category?id=${category?.id}`, name: category?.name }]} />
      <Card>
        <List<PostType>
          itemLayout="vertical"
          dataSource={posts}
          pagination={{
            size: 'small',
            ...pagination,
          }}
          renderItem={(item) => {
            return (
              <List.Item
                onClick={() => history.push(`/post?id=${item.id}`)}
                style={{ cursor: 'pointer' }}
                extra={item.cover && <img src={item.cover} width={64} alt={item.title} />}
                actions={[<PostInfo data={item} key="info" />]}
              >
                <List.Item.Meta title={item.title} description={item.description} />
              </List.Item>
            );
          }}
        />
      </Card>
    </div>
  );
};

export default PostCategory;
