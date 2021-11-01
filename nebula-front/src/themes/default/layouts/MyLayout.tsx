import React from 'react';
import { Col, Row } from 'antd';
import PublicHeader from '@/themes/default/components/PublicHeader';
import PublicFooter from '@/themes/default/components/PublicFooter';
import MyMenu from '@/themes/default/components/MyMenu';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';
import styles from './MyLayout.less';

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
    <>
      <PublicHeader />
      <section className={styles.myContainer}>
        <div className={styles.myInner}>
          <Row gutter={16}>
            <Col span={6}>
              <MyMenu />
            </Col>
            <Col span={18}>
              <>{newChildren}</>
            </Col>
          </Row>
        </div>
      </section>
      <PublicFooter />
    </>
  );
};

export default MyLayout;
