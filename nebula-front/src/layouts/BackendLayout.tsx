import React, { useState } from 'react';
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { Link, history, useModel } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import settings from '../../config/defaultSettings';
import { stringify } from 'querystring';

export type BackendLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
} & ProLayoutProps;

export type BasicLayoutContext = { [K in 'location']: BackendLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    return {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
  });

const loginPath = '/auth/login';

const BackendLayout: React.FC<BackendLayoutProps> = (props) => {
  const {
    children,
    location = {
      pathname: '/',
    },
  } = props;
  const { initialState } = useModel('@@initialState');
  // TODO 应该放在 initialState
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ProLayout
      {...settings}
      {...props}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => <Footer />}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      onPageChange={() => {
        // 如果没有登录，重定向到 login
        if (!initialState?.currentUser) {
          history.push({
            pathname: loginPath,
            search: stringify({
              redirect: location.pathname,
            }),
          });
        }
      }}
    >
      {children}
    </ProLayout>
  );
};

export default BackendLayout;
