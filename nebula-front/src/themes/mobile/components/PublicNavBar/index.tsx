import React, { useMemo } from 'react';
import { history } from 'umi';
import IconText from '@/components/IconText/IconText';
import { LeftOutlined } from '@ant-design/icons';
import type { Route } from '@ant-design/pro-layout/es/typings';

import styles from './style.less';

export type PublicNavBarProps = {
  route: Route;
  sticky?: boolean;
  renderLeft?: () => React.ReactNode;
  renderRight?: () => React.ReactNode;
};

const PublicNavBar: React.FC<PublicNavBarProps> = (props) => {
  const { sticky = true, renderLeft, renderRight, route } = props;
  const { location } = history;

  const leftContent = useMemo(() => {
    if (renderLeft) {
      return renderLeft();
    }
    if (location.pathname === '/home') {
      return null;
    }
    return (
      <a onClick={history.goBack}>
        <IconText icon={<LeftOutlined />} text="返回" />
      </a>
    );
  }, [location.pathname, renderLeft]);

  const title = useMemo(() => {
    const foundRoute = route.routes?.find((item) => item.path === location.pathname);
    return foundRoute ? foundRoute.name : '';
  }, [location.pathname, route]);

  return (
    <section className={styles.container} style={{ position: sticky ? 'fixed' : 'relative' }}>
      <div className={styles.leftContainer}>{leftContent}</div>
      <div className={styles.centerContainer}>{title}</div>
      <div className={styles.rightContainer}>{renderRight && renderRight()}</div>
    </section>
  );
};

export default PublicNavBar;
