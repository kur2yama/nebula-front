import React from 'react';
import { useModel } from 'umi';
import { ConfigProvider } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import zhCN from 'antd/es/locale/zh_CN';
import { getLayoutThemeComponent } from '@/themes';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';

type PublicLayoutProps = {
  route: Route;
};

const PublicLayout: React.FC<PublicLayoutProps> = (props) => {
  const { children, route } = props;
  const { initialState, loading } = useModel('@@initialState');

  if (loading || !initialState || !initialState.currentSite) {
    return <PageLoading />;
  }

  const Component = getLayoutThemeComponent(
    initialState.currentSite.config,
    'public',
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

export default PublicLayout;
