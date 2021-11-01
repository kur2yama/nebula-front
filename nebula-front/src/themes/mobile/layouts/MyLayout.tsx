import React from 'react';
import PublicTabBar from '@/themes/mobile/components/PublicTabBar';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';
import styles from './style.less';

type MyLayoutProps = {
  currentSite: SiteType;
  route: Route;
};

const MyLayout: React.FC<MyLayoutProps> = (props) => {
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

  return (
    <section className={styles.container}>
      {newChildren}
      <PublicTabBar />
    </section>
  );
};

export default MyLayout;
