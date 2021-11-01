import React from 'react';
import { useModel } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { ProForm } from '@nebula/pro-form';
import * as mediaServices from '@/services/media';
import PublicBreadcrumb from '@/themes/default/components/PublicBreadcrumb';
import type { ProFormColumn } from '@nebula/pro-form';
import type { SiteType } from '@/types/site';
import type { Route } from '@ant-design/pro-layout/es/typings';
import type { UserType } from '@/types/user';

type MyProfileProps = {
  currentSite: SiteType;
  route: Route;
};

const MyProfile: React.FC<MyProfileProps> = ({ route }) => {
  const { initialState } = useModel('@@initialState');
  const { updateProfile, loading } = useModel('useAuth');

  if (!initialState || !initialState.currentUser) {
    return <PageLoading />;
  }

  const columns: ProFormColumn<UserType>[] = [
    {
      dataIndex: 'nickname',
      title: '昵称',
      formItemProps: {
        tooltip: '2-32个字符',
        rules: [
          { required: true, message: '请填写昵称' },
          { min: 2, max: 32, message: '昵称为2-32个字符' },
        ],
      },
    },
    {
      dataIndex: 'avatar',
      title: '头像',
      valueType: 'mediaUpload',
      fieldProps: {
        services: mediaServices,
        returnType: 'url',
        rectSize: '300*300',
        fileType: ['image'],
      },
      formItemProps: {
        tooltip: 'png, jpg, gif, 300*300, 200KB以下',
        rules: [{ required: true, message: '请上传头像' }],
      },
    },
  ];

  return (
    <>
      <PublicBreadcrumb routes={[{ path: '/my', name: '我的' }, route]} />
      <div>
        <ProForm
          columns={columns}
          onFinish={updateProfile}
          initialValues={initialState.currentUser}
        >
          <ProForm.Item wrapperCol={{ offset: 4 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存
            </Button>
          </ProForm.Item>
        </ProForm>
      </div>
    </>
  );
};

export default MyProfile;
