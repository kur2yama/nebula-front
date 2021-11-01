import React from 'react';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';
import styles from './AuthLayout.less';

type AuthLayoutProps = {
  currentSite: SiteType;
  route: Route;
};

const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  const { currentSite, route, children } = props;

  const newChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        currentSite,
        route,
      });
    }
    return child;
  });

  return (
    <div className={styles.container}>
      {newChildren}
      <div className={styles.footer}>
        <div>{currentSite.config.profile.copyright}</div>
        <div>
          {currentSite.config.profile.icp} {currentSite.config.profile.policeIcp}
        </div>
        <div>
          Version: {APP_VERSION}, Build {APP_BUILD_DATE}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
