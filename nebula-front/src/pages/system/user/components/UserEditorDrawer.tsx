/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { Button, Divider, Drawer, Form, Input, Radio, Select, Space, TreeSelect } from 'antd';
import type { RoleType } from '@/types/role';
import type { GroupType } from '@/types/group';
import type { UserType } from '@/types/user';
import { USER } from '@/dictionary';
import { transData, treeToFlatten } from '@nebula/utils';
import { getWidth } from '@/utils';
import { MediaUpload } from '@nebula/design';
import * as mediaServices from '@/services/media';

const { SHOW_PARENT } = TreeSelect;

export interface UserEditorDrawerProps {
  visible: boolean;
  mode: string;
  roles?: RoleType[];
  groups?: GroupType[];
  data?: UserType;
  onSubmit?: (values: any) => void;
  onClose?: () => void;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export const defaultUserEditor: UserEditorDrawerProps = {
  visible: false,
  mode: 'create',
  data: undefined,
};

const UserEditorDrawer: React.FC<UserEditorDrawerProps> = (props) => {
  const { visible, mode, roles = [], groups = [], onClose, onSubmit, data } = props;
  const [form] = Form.useForm();
  const title = mode === 'create' ? '新建' : '更新';

  useEffect(() => {
    if (visible && mode === 'update' && data) {
      form.setFieldsValue({
        ...data,
        roles: data.roles.map((role) => `${role.id}`),
        groups: treeToFlatten(data.groups).map((group) => `${group.id}`),
      });
    }
    return () => {
      if (form && !visible) {
        form.resetFields();
      }
    };
  }, [form, visible, data]);

  const handleFormFinish = (values: any) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const roleData = useMemo(() => {
    return roles.map((role) => ({ label: role.displayName, value: `${role.id}` }));
  }, [roles]);

  const groupData = useMemo(() => transData(groups, 'displayName'), [groups]);

  return (
    <Drawer
      title={title}
      visible={visible}
      width={getWidth()}
      forceRender
      maskClosable={mode === 'update'}
      onClose={onClose}
    >
      <Form {...layout} form={form} onFinish={handleFormFinish} initialValues={USER.defaultValue}>
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请填写用户名' }]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="nickname" label="昵称">
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: '请填写用户名' }]}>
          <Input autoComplete="off" />
        </Form.Item>
        {mode === 'create' && (
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请填写密码' }]}
          >
            <Input.Password
              autoComplete="new-password"
              placeholder="请填写密码"
              key="userPassword"
            />
          </Form.Item>
        )}
        <Form.Item name="status" label="是否启用">
          <Radio.Group options={USER.status} />
        </Form.Item>
        <Form.Item name="avatar" label="头像">
          <MediaUpload services={mediaServices} fileType={['image']} fileSize="2M" />
        </Form.Item>
        <Form.Item name="roles" label="角色">
          <Select mode="tags" options={roleData} />
        </Form.Item>
        <Form.Item name="groups" label="用户组">
          <TreeSelect treeData={groupData} treeCheckable showCheckedStrategy={SHOW_PARENT} />
        </Form.Item>
      </Form>
      <Divider />
      <div style={{ textAlign: 'center' }}>
        <Space size="large">
          <Button size="large" onClick={onClose}>
            关闭
          </Button>
          <Button size="large" type="primary" onClick={() => form.submit()}>
            保存
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};

export default UserEditorDrawer;
