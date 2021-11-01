import React from 'react';
import { history } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { getPageConfigByTheme } from '@/themes/index';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';

type ThemePageProps = {
  currentSite: SiteType;
  route: Route;
};

const ThemePage: React.FC<ThemePageProps> = (props) => {
  const { location } = history;
  const { currentSite, route } = props;

  const pageConfig = getPageConfigByTheme(currentSite.config, location.pathname);
  if (!pageConfig) {
    return null;
  }

  const Component = pageConfig.component as React.ComponentType<{
    currentSite: SiteType;
    route: Route;
  }>;

  return (
    <React.Suspense fallback={<PageLoading />}>
      <Component currentSite={currentSite} route={route} />
    </React.Suspense>
  );
};

export default ThemePage;
