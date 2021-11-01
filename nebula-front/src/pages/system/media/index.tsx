import React, { useState } from 'react';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { MediaUpload } from '@nebula/design';
import * as services from '@/services/media';

// import MediaList from './components/MediaList';
// import MediaUpload from './components/MediaUpload';

const tabList = [
  { tab: '媒体库', key: 'list' },
  { tab: '上传媒体', key: 'upload' },
];

const Medias: React.FC = () => {
  const [currentKey, setCurrentKey] = useState<string>('list');

  const renderContent = () => {
    switch (currentKey) {
      case 'upload':
        return <MediaUpload.Upload services={services} drag />;
      case 'list':
        return (
          <Card>
            <MediaUpload.MediaList allowCrop services={services} />
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer tabList={tabList} tabActiveKey={currentKey} onTabChange={setCurrentKey}>
      {renderContent()}
    </PageContainer>
  );
};

export default Medias;
