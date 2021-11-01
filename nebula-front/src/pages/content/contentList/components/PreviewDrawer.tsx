import React, { useEffect } from 'react';
import { Drawer, Spin } from 'antd';
import { useRequest } from 'ahooks';
import ReactJson from 'react-json-view';
import * as services from '@/services/contentList';
import type { ContentListType } from '@/types/contentList';
import { getWidth } from '@/utils';

export interface PreviewDrawerProps {
  visible: boolean;
  data?: ContentListType;
  onClose?: () => void;
}

const PreviewDrawer: React.FC<PreviewDrawerProps> = (props) => {
  const { visible, onClose, data } = props;
  const contentListFetch = useRequest(services.fetch, { manual: true });

  useEffect(() => {
    if (visible && data) {
      contentListFetch.run({ id: data.id });
    }
    return () => {
      if (!visible) {
        contentListFetch.reset();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, data]);

  return (
    <Drawer visible={visible} onClose={onClose} title="结果预览" width={getWidth()}>
      {contentListFetch.data ? <ReactJson src={contentListFetch.data} /> : <Spin spinning />}
    </Drawer>
  );
};

export default PreviewDrawer;
