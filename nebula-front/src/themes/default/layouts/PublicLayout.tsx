import React from 'react';
import PublicHeader from '@/themes/default/components/PublicHeader';
import PublicFooter from '@/themes/default/components/PublicFooter';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';
import styles from './PublicLayout.less';

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
      <PublicHeader />
      <>{newChildren}</>
      <PublicFooter />
    </section>
  );
};

export default PublicLayout;
