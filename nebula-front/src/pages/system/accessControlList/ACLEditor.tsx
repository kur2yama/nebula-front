import React, { useEffect, useMemo } from 'react';
import { Button, Drawer, Form, Input, Select, Tag } from 'antd';
import { ACL, BACKEND } from '@/dictionary';
import type { ACLType } from '@/types/accessControlList';
import type { RoleType } from '@/types/role';
import { getWidth } from '@/utils';

export interface ACLEditorProps {
  visible: boolean;
  data?: ACLType;
  roles?: RoleType[];
  onClose?: () => void;
  onOk?: (values: any) => void;
  loading?: boolean;
}

const ACLEditor: React.FC<ACLEditorProps> = (props) => {
  const { visible, roles, onOk, onClose, data, loading } = props;
  const [form] = Form.useForm();
  const handleFormFinished = (values: any) => {
    if (onOk) {
      onOk(values);
    }
  };

  useEffect(
    () => {
      if (data && visible) {
        form.setFieldsValue({
          ...data,
          roles: data.roles.map((role) => `${role.id}`),
        });
      }
      return () => {
        if (!visible) {
          form.resetFields();
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, visible],
  );

  const roleOptions = useMemo(() => {
    if (!roles) {
      return [];
    }

    return roles.map((role) => ({
      value: `${role.id}`,
      label: role.displayName,
    }));
  }, [roles]);

  const apiMethod = useMemo(() => {
    if (data) {
      const foundMethod = ACL.method.find((item) => item.value === data.method);
      return <Tag color={foundMethod?.color}>{foundMethod?.label}</Tag>;
    }
    return null;
  }, [data]);

  return (
    <Drawer title="编辑" width={getWidth()} visible={visible} onClose={onClose} forceRender>
      <Form {...BACKEND.layout} form={form} onFinish={handleFormFinished}>
        <Form.Item label="URI">
          <div>
            {apiMethod} <code>{data?.uri}</code>
          </div>
        </Form.Item>
        <Form.Item label="描述" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="允许的角色" name="roles">
          <Select options={roleOptions} mode="multiple" allowClear />
        </Form.Item>
        <Form.Item {...BACKEND.tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ACLEditor;
