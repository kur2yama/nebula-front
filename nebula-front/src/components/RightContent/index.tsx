import React, { useEffect } from 'react';
import { Space, message } from 'antd';
import { useModel } from 'umi';
import { useLocalStorageState } from 'ahooks';
import { Switch, useDarkreader } from 'react-darkreader';
import copy from 'copy-to-clipboard';
import { getToken } from '@/utils';
import { PROJECT } from '@/constants';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';
const darkThemeCacheName = `${PROJECT.code}:dark-theme`;

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [isDarkTheme, setDarkTheme] = useLocalStorageState(darkThemeCacheName, false);
  const [isDark, { toggle }] = useDarkreader(isDarkTheme);

  useEffect(() => {
    setDarkTheme(isDark);
  }, [isDark, setDarkTheme]);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const handleCopyToken = () => {
    copy(getToken());
    message.success('token已复制');
  };

  return (
    <Space className={className}>
      <Avatar menu />
      <Switch checked={isDark} onChange={toggle} />
      <div className={styles.envText} onClick={handleCopyToken}>
        {REACT_APP_ENV}
      </div>
    </Space>
  );
};

export default GlobalHeaderRight;
