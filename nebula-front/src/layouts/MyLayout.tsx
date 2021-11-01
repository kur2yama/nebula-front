import React from 'react';
import { useModel, history } from 'umi';
import { ConfigProvider } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import zhCN from 'antd/es/locale/zh_CN';
import { getLayoutThemeComponent } from '@/themes';
import { stringify } from 'querystring';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';

type MyLayoutProps = {
  route: Route;
};

const MyLayout: React.FC<MyLayoutProps> = (props) => {
  const { children, route } = props;
  const { initialState, loading } = useModel('@@initialState');

  if (loading || !initialState || !initialState.currentSite) {
    return <PageLoading />;
  }

  if (!initialState.currentUser) {
    history.replace({
      pathname: '/auth/login',
      search: stringify({
        redirect: history.location.pathname,
      }),
    });
    return null;
  }

  const Component = getLayoutThemeComponent(
    initialState.currentSite.config,
    'my',
  ) as React.ComponentType<{
    currentSite: SiteType;
    route: Route;
  }>;

  return (
    <ConfigProvider locale={zhCN}>
      <React.Suspense fallback={<PageLoading />}>
        <Component currentSite={initialState.currentSite} route={route}>
          {children}
        </Component>
      </React.Suspense>
    </ConfigProvider>
  );
};

export default MyLayout;
