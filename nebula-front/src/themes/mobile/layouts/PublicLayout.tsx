import React from 'react';
import PublicNavBar from '@/themes/mobile/components/PublicNavBar';
import PublicTabBar from '@/themes/mobile/components/PublicTabBar';
import type { Route } from '@ant-design/pro-layout/es/typings';
import type { SiteType } from '@/types/site';
import styles from './style.less';

type PublicLayoutProps = {
  currentSite: SiteType;
  route: Route;
};

const PublicLayout: React.FC<PublicLayoutProps> = (props) => {
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
      <section className={styles.inner}>{newChildren}</section>
      <PublicNavBar route={route} />
      <PublicTabBar />
    </section>
  );
};

export default PublicLayout;
