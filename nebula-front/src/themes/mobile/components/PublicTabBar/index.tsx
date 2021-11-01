import { useMemo } from 'react';
import { history } from 'umi';
import { pathToRegexp } from 'path-to-regexp';
import { TabBar } from 'antd-mobile-v5';
import { HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import styles from './style.less';

const PublicTabBar = () => {
  const { location } = history;

  const tabs = useMemo(() => {
    return [
      {
        key: '/home',
        title: '首页',
        icon: <HomeOutlined />,
        regExp: '/home',
      },
      {
        key: '/exception/404',
        title: '功能页',
        icon: <MessageOutlined />,
        regExp: '/exception/(.*)',
      },
      {
        key: '/my/home',
        title: '我的',
        icon: <UserOutlined />,
        regExp: '/my/(.*)',
      },
    ];
  }, []);

  const activeKey = useMemo(() => {
    const currentKey = tabs.find((item) => pathToRegexp(item.regExp).exec(location.pathname));

    return currentKey ? currentKey.key : '/home';
  }, [location.pathname, tabs]);

  const handleKeyChange = (changedActiveKey: string) => {
    history.push(changedActiveKey);
  };

  return (
    <section className={styles.container}>
      <TabBar
        activeKey={activeKey}
        onChange={handleKeyChange}
        style={{ position: 'relative', background: '#666' }}
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </section>
  );
};

export default PublicTabBar;
