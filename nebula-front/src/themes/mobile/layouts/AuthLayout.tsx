import React from 'react';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';
import styles from './style.less';

type AuthLayoutProps = {
  currentSite: SiteType;
  route: Route;
};

const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  const { children, currentSite, route } = props;

  const newChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        currentSite,
        route,
      });
    }
    return child;
  });

  return <section className={styles.container}>{newChildren}</section>;
};

export default AuthLayout;
