import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { useModel } from 'umi';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import * as siteServices from '@/services/site';
import * as groupServices from '@/services/group';
import * as roleServices from '@/services/role';
import SiteBasic from '@/pages/system/site/SiteBasic';
import SiteConfigProfile from '@/pages/system/site/SiteConfigProfile';
import SiteConfigAuth from '@/pages/system/site/SiteConfigAuth';
import SiteConfigPost from '@/pages/system/site/SiteConfigPost';
import SiteConfigProvider from '@/pages/system/site/SiteConfigProvider';

const Site: React.FC = () => {
  const { initialState = {}, setInitialState } = useModel('@@initialState');
  const { currentSite } = initialState;

  const [currentTab, setCurrentTab] = useState('basic');
  const updateSite = useRequest(siteServices.update, { manual: true });
  const groups = useRequest(groupServices.search, { formatResult: (res) => res.data });
  const roles = useRequest(roleServices.searchAll, { formatResult: (res) => res.data });

  const handleSave = (values: any) => {
    updateSite.run(values).then((res) => {
      if (res.success) {
        setInitialState((s) => ({
          ...s,
          currentSite: res.data,
        }));
      }
    });
  };

  const tabList = [
    { tab: '基础信息', key: 'basic' },
    { tab: '详细信息', key: 'configProfile' },
    { tab: '认证相关', key: 'configAuth' },
    { tab: '文章相关', key: 'configPost' },
    { tab: '第三方参数', key: 'configProvider' },
  ];

  const renderContent = () => {
    switch (currentTab) {
      case 'configProfile':
        return (
          <SiteConfigProfile
            data={currentSite?.config}
            onSave={handleSave}
            loading={updateSite.loading}
          />
        );
      case 'configPost':
        return (
          <SiteConfigPost
            data={currentSite?.config}
            onSave={handleSave}
            loading={updateSite.loading}
          />
        );
      case 'configProvider':
        return (
          <SiteConfigProvider
            data={currentSite?.config}
            onSave={handleSave}
            loading={updateSite.loading}
          />
        );
      case 'configAuth':
        return (
          <SiteConfigAuth
            data={currentSite?.config}
            onSave={handleSave}
            loading={updateSite.loading}
            roles={roles.data}
            groups={groups.data}
          />
        );
      case 'basic':
      default:
        return <SiteBasic data={currentSite} onSave={handleSave} loading={updateSite.loading} />;
    }
  };

  return (
    <PageContainer tabList={tabList} tabActiveKey={currentTab} onTabChange={setCurrentTab}>
      <Card>{renderContent()}</Card>
    </PageContainer>
  );
};

export default Site;
