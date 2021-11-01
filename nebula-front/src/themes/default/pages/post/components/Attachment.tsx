import React from 'react';
import { Divider, List } from 'antd';
import { FileTwoTone } from '@ant-design/icons';
import IconText from '@/components/IconText/IconText';
import type { MediaType } from '@nebula/design';

export type AttachmentProps = {
  data?: MediaType[];
};

const Attachment: React.FC<AttachmentProps> = (props) => {
  const { data } = props;

  if (!data || data.length < 1) {
    return null;
  }

  return (
    <section style={{ marginTop: 32 }}>
      <Divider orientation="left">附件</Divider>
      <List
        size="small"
        split={false}
        dataSource={data}
        renderItem={(item) => {
          return (
            <IconText
              icon={<FileTwoTone />}
              text={
                <a href={item.url} target="_blank">
                  {item.fileName}
                </a>
              }
            />
          );
        }}
      />
    </section>
  );
};

export default Attachment;
