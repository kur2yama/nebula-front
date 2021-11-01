import { history } from 'umi';
import { List, Image } from 'antd-mobile-v5';
import type { PostType } from '@/types/post';

type ContentItemProps = {
  data: PostType;
};

type ContentListProps = {
  dataSource?: ContentItemProps[];
};

const ContentList = (props: ContentListProps) => {
  const { dataSource = [] } = props;
  return (
    <div style={{ marginTop: 8 }}>
      <List>
        {dataSource.map((item) => (
          <List.Item
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(`/post?id=${item.data.id}`)}
            prefix={
              <Image
                src={item.data.cover || ''}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            key={item.data.id}
          >
            {item.data.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default ContentList;
