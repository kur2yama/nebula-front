import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import type { Route } from '@ant-design/pro-layout/es/typings';

type PublicBreadcrumbProps = {
  routes?: Route[];
};

const PublicBreadcrumb: React.FC<PublicBreadcrumbProps> = (props) => {
  const { routes = [] } = props;

  const renderRoutes = () =>
    routes.map((route, index) => {
      const key = `breadcrumb-${index}`;
      return (
        <Breadcrumb.Item key={key}>
          {route.path ? <Link to={route.path}>{route.name}</Link> : route.name}
        </Breadcrumb.Item>
      );
    });

  return (
    <Breadcrumb style={{ marginBottom: 16 }}>
      <Breadcrumb.Item>
        <Link to="/home">
          <HomeOutlined />
        </Link>
      </Breadcrumb.Item>
      {renderRoutes()}
    </Breadcrumb>
  );
};

export default PublicBreadcrumb;
