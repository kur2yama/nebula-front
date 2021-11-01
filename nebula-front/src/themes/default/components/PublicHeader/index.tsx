import React, { useMemo } from 'react';
import { useModel, history, useAccess, Link } from 'umi';
import { Col, Row, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import styles from './style.less';

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

const PublicHeader: React.FC = () => {
  // const { location } = history;
  // const [menuKey, setMenuKey] = useState<string>('/home');
  const { initialState } = useModel('@@initialState');
  const { logout } = useModel('useAuth');
  const access = useAccess();

  const accountMenuTitle = useMemo(() => {
    if (initialState?.isLoggedIn) {
      return <>你好，{initialState?.currentUser?.nickname}</>;
    }
    return <>请登录</>;
  }, [initialState]);

  // useEffect(() => {
  //   setMenuKey(location.pathname);
  // }, [location.pathname]);

  const handleMenuChange = async (key: string) => {
    if (key === 'logout') {
      await logout();
    } else {
      history.push(key);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Row gutter={16}>
          <Col span={8}>
            <Link to="/home" className={styles.headerBrand}>
              <img src={initialState?.currentSite?.logo} alt="logo" />
              <div>{initialState?.currentSite?.name}</div>
            </Link>
          </Col>
          <Col span={16}>
            <div className={styles.headerRight}>
              <div className={styles.headerMenu}>
                <Menu
                  mode="horizontal"
                  selectedKeys={[]}
                  onClick={(e) => handleMenuChange(e.key)}
                  builtinPlacements={{
                    bottomLeft: {
                      points: ['tl', 'bl'],
                      overflow: autoAdjustOverflow,
                      offset: [-16, 7],
                    },
                  }}
                >
                  <Menu.Item key="/home" icon={<HomeOutlined />}>
                    首页
                  </Menu.Item>
                  <Menu.SubMenu title="页面" key="pages" popupClassName={styles.headerPopup}>
                    <Menu.Item key="/post?id=8">文章详情</Menu.Item>
                    <Menu.Item key="/category?id=2">文章列表</Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu title="功能页" key="feature" popupClassName={styles.headerPopup}>
                    <Menu.Item key="/exception/timeout">请求超时</Menu.Item>
                    <Menu.Item key="/exception/404">页面未找到</Menu.Item>
                    <Menu.Item key="/exception/403">页面无权访问</Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu
                    title={accountMenuTitle}
                    key="account"
                    popupClassName={styles.headerPopup}
                  >
                    {initialState?.isLoggedIn ? (
                      <>
                        {access.onlyBackend ? (
                          <>
                            <Menu.Item key="/backend">管理后台</Menu.Item>
                            <Menu.Divider />
                          </>
                        ) : null}

                        <Menu.Item key="/my/home">我的</Menu.Item>
                        <Menu.Item key="logout">退出</Menu.Item>
                      </>
                    ) : (
                      <Menu.Item key="/auth/login">登录</Menu.Item>
                    )}
                  </Menu.SubMenu>
                </Menu>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default PublicHeader;
