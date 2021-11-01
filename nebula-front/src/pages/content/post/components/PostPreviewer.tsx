import React, { useEffect, useMemo } from 'react';
import { useRequest } from 'ahooks';
import { Drawer, Empty, Image, Spin } from 'antd';
import * as services from '@/services/post';
import type { PostType } from '@/types/post';
import { getWidth } from '@/utils';

export interface PostPreviewerProps {
  visible: boolean;
  data?: PostType;
  onClose?: () => void;
}

const PostPreviewer: React.FC<PostPreviewerProps> = (props) => {
  const { visible, data, onClose } = props;
  const post = useRequest(services.find, { manual: true, formatResult: (res) => res.data });

  useEffect(() => {
    if (visible && data) {
      post.run(data).catch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, data]);

  const previewContent = useMemo(() => {
    if (!visible) {
      return null;
    }
    if (post.loading) {
      return <Spin spinning />;
    }
    if (!post.data) {
      return <Empty />;
    }

    return (
      <div>
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <small>
            发布于: {post.data.publishedAt} by: {post.data.author}
          </small>
        </div>

        <div style={{ marginBottom: 16 }}>{post.data.description}</div>
        <div style={{ marginBottom: 16 }}>
          <Image src={post.data.cover} alt="cover" />
        </div>
        <div style={{ marginBottom: 16 }}>图集</div>
        <div
          dangerouslySetInnerHTML={{ __html: post.data.content || '' }}
          style={{ marginBottom: 16 }}
        />
      </div>
    );
  }, [post.data, visible]);

  return (
    <Drawer title={data?.title} visible={visible} onClose={onClose} width={getWidth()}>
      {previewContent}
    </Drawer>
  );
};

export default PostPreviewer;
