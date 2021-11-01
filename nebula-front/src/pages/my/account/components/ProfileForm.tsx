import { ProForm } from '@nebula/pro-form';
import { useModel } from 'umi';
import { Button, Input } from 'antd';
import { MediaUpload } from '@nebula/design';
import * as mediaServices from '@/services/media';
import { PageLoading } from '@ant-design/pro-layout';

const ProfileForm = () => {
  const { initialState } = useModel('@@initialState');
  const { updateProfile, loading } = useModel('useAuth');

  if (!initialState || !initialState.currentUser) {
    return <PageLoading />;
  }

  return (
    <>
      <ProForm
        layout="vertical"
        wrapperCol={{ offset: 3, span: 8 }}
        labelCol={{ offset: 3, span: 8 }}
        onFinish={updateProfile}
        initialValues={initialState.currentUser}
      >
        <ProForm.Item>
          <h3>修改个人信息</h3>
        </ProForm.Item>
        <ProForm.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请填写用户名' }]}
          tooltip="系统唯一标识，不允许修改"
        >
          <Input disabled />
        </ProForm.Item>
        <ProForm.Item
          label="昵称"
          name="nickname"
          rules={[{ required: true, message: '请填写昵称' }]}
          tooltip="昵称,2-16个字符"
        >
          <Input />
        </ProForm.Item>
        <ProForm.Item
          label="头像"
          name="avatar"
          rules={[{ required: true, message: '请上传头像' }]}
          tooltip="用户头像，JPG,PNG,GIF, 300*300, 小于2M"
        >
          <MediaUpload
            services={mediaServices}
            fileType={['image']}
            fileSize="2m"
            rectSize="300*300"
            buttonRender="上传头像"
          />
        </ProForm.Item>
        <ProForm.Item wrapperCol={{ offset: 3, span: 8 }}>
          <Button size="large" type="primary" loading={loading} htmlType="submit">
            保存
          </Button>
        </ProForm.Item>
      </ProForm>
    </>
  );
};

export default ProfileForm;
