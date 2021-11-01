import React from 'react';
import { useRequest } from 'umi';
import { PullToRefresh } from 'antd-mobile-v5';
import { PageLoading } from '@ant-design/pro-layout';
import Carousel from './components/Carousel';
import GridNav from './components/GridNav';
import ContentList from './components/ContentList';
import * as homeServices from './services';
import type { SiteType } from '@/types/site';

type HomeProps = {
  currentSite: SiteType;
};

const Home: React.FC<HomeProps> = () => {
  const homeRequest = useRequest(homeServices.fetch);
  const { data } = homeRequest;

  if (!data) {
    return <PageLoading />;
  }

  return (
    <PullToRefresh onRefresh={homeRequest.refresh}>
      <Carousel dataSource={data.content[0].data.content} />
      <GridNav />
      <ContentList dataSource={data.content[1].data.content} />
    </PullToRefresh>
  );
};

export default Home;
