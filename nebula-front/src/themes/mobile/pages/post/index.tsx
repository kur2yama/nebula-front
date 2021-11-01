import React from 'react';
import WingSpace from '@/components/mobile/WingSpace';
import PostInfo from './components/PostInfo';
import Attachment from './components/Attachment';
import type { SiteType } from '@/types/site';
import type { RouteType } from '@/types/global';
import type { PostType } from '@/types/post';
import styles from './style.less';
import Gallery from '@/themes/default/pages/post/components/Gallery';

type PostPageProps = {
  currentSite: SiteType;
  route: RouteType;
  data: PostType;
};

const PostPage: React.FC<PostPageProps> = (props) => {
  const { data } = props;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <WingSpace>
          <h1>{data.title}</h1>
          <PostInfo data={data} />
          <Gallery data={data.gallery} />
          <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
          <Attachment data={data.attachment} />
        </WingSpace>
      </div>
    </div>
  );
};

export default PostPage;
