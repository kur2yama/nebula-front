import React from 'react';
import { history, useRequest } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import * as postServices from '@/services/post';
import { getPostThemeConfig } from '@/themes/index';
import type { SiteType } from '@/types/site';
import type { PostType } from '@/types/post';
import type { Route } from '@ant-design/pro-layout/es/typings';

type ThemePostProps = {
  currentSite: SiteType;
  route: Route;
};

const ThemePost: React.FC<ThemePostProps> = (props) => {
  const { currentSite } = props;
  const { location } = history;
  const { query } = location;
  const post = useRequest(() => postServices.publicFind(query as { id: any }), {
    formatResult: (res) => res.data,
  });

  if (post.loading) {
    return <PageLoading />;
  }

  // 获取文章
  const postConfig = getPostThemeConfig(currentSite.config, post.data.template);
  if (!postConfig) {
    return <div>无模板</div>;
  }

  const Component = postConfig.component as React.ComponentType<{
    currentSite: SiteType;
    data: PostType;
    route: Route;
  }>;

  return (
    <React.Suspense fallback={<PageLoading />}>
      <Component
        data={post.data}
        currentSite={currentSite}
        route={{ path: location.pathname, name: postConfig.label }}
      />
    </React.Suspense>
  );
};

export default ThemePost;
