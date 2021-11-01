import React from 'react';
import { useModel, useAccess, Access, history } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { Image, List } from 'antd-mobile-v5';
import {
  MoneyCollectOutlined,
  ProfileOutlined,
  SettingOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import type { SiteType } from '@/types/site';
import styles from './style.less';

type MyHomeProps = {
  currentSite: SiteType;
};

const MyHome: React.FC<MyHomeProps> = () => {
  const { initialState } = useModel('@@initialState');
  const access = useAccess();
  const auth = useModel('useAuth');
  if (!initialState || !initialState.currentUser) {
    return <PageLoading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.userAvatar}>
        <Image src={initialState.currentUser.avatar || ''} width={128} />
      </div>

      <List>
        <Access accessible={access.onlyAdmin}>
          <List.Item
            prefix={<DashboardOutlined />}
            onClick={() => {
              history.push('/backend');
            }}
          >
            管理平台
          </List.Item>
        </Access>
        <List.Item prefix={<ProfileOutlined />} onClick={() => {}}>
          我的信息
        </List.Item>

        <List.Item prefix={<MoneyCollectOutlined />} onClick={() => {}}>
          修改密码
        </List.Item>
        <List.Item prefix={<SettingOutlined />} onClick={() => {}}>
          我的收藏
        </List.Item>
        <List.Item prefix={<SettingOutlined />} onClick={auth.logout}>
          退出
        </List.Item>
      </List>
    </div>
  );
};

export default MyHome;
