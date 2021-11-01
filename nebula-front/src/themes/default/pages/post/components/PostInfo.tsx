import React from 'react';
import { Space } from 'antd';
import IconText from '@/components/IconText/IconText';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';
import type { PostType } from '@/types/post';
import styles from '../style.less';

export type PostInfoProps = {
  data: PostType;
};

const PostInfo: React.FC<PostInfoProps> = ({ data }) => {
  return (
    <section className={styles.postInfo}>
      <Space>
        <IconText text={data.pageViews} icon={<LikeOutlined />} />
        <IconText text={data.pageViews} icon={<EyeOutlined />} />
      </Space>
    </section>
  );
};

export default PostInfo;
