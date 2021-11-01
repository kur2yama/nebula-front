import React, { useEffect, useMemo } from 'react';
import { history, useRequest, useModel } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import * as postServices from '@/services/post';
import * as postCategoryServices from '@/services/postCategory';
import { getPostCategoryThemeConfig } from '@/themes/index';
import type { SiteType } from '@/types/site';
import type { PostType } from '@/types/post';
import type { PaginationType } from '@/types/global';
import type { PostCategoryType } from '@/types/postCategory';
import type { Route } from '@ant-design/pro-layout/es/typings';

type ThemePostCategoryProps = {
  route: Route;
};

const ThemePostCategory: React.FC<ThemePostCategoryProps> = () => {
  const { location } = history;
  const { query } = location;
  const { initialState } = useModel('@@initialState');
  const category = useRequest(() => postCategoryServices.publicFind(query as { id: any }));
  const posts = useRequest(postServices.publicSearch, {
    manual: true,
    formatResult: (res) => res.data,
  });

  useEffect(
    () => {
      if (initialState && initialState.currentSite && query && query.id) {
        // TODO 添加分页
        posts.run({
          categoryId: query.id,
          page: query.page || '1',
          pageSize: query.pageSize || '10',
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialState, category.data, query],
  );

  const { dataSource, pageProps } = useMemo(() => {
    if (posts.data) {
      const { list, ...restData } = posts.data;
      return { dataSource: list, pageProps: restData };
    }
    return { dataSource: [], pageProps: { current: 1, total: 0, pageSize: 10 } };
  }, [posts.data]);

  if (!query || !query.id) {
    return <div>参数错误</div>;
  }

  if (!initialState || !initialState.currentSite || !category.data) {
    return <PageLoading />;
  }

  // TODO 获取文章分类
  const postCategoryConfig = getPostCategoryThemeConfig(
    initialState.currentSite.config,
    category.data.template,
  );
  if (!postCategoryConfig) {
    return <div>无模板</div>;
  }

  const Component = postCategoryConfig.component as React.ComponentType<{
    currentSite: SiteType;
    category?: PostCategoryType;
    posts?: PostType[];
    pagination?: PaginationType;
    route: Route;
  }>;

  return (
    <React.Suspense fallback={<PageLoading />}>
      <Component
        category={category.data}
        posts={dataSource}
        pagination={pageProps}
        currentSite={initialState.currentSite}
        route={{ path: location.pathname, name: postCategoryConfig.label }}
      />
    </React.Suspense>
  );
};

export default ThemePostCategory;
