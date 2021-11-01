import React from 'react';
import { QqOutlined, WechatOutlined, WeiboOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import type { PostType } from '@/types/post';
import styles from '../style.less';

export type SharePanelProps = {
  data: PostType;
};

const SharePanel: React.FC<SharePanelProps> = () => {
  return (
    <Space className={styles.sharePanel}>
      <a>
        <WeiboOutlined />
      </a>
      <a>
        <WechatOutlined />
      </a>
      <a>
        <QqOutlined />
      </a>
    </Space>
  );
};

export default SharePanel;
