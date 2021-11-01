import React, { useEffect, useMemo } from 'react';
import { Alert, Checkbox, Form, Modal } from 'antd';
import type { RoleType } from '@/types/role';
import { BACKEND } from '@/dictionary';

export interface ACLRolesProps {
  visible: boolean;
  roles?: RoleType[];
  onCancel?: () => void;
  onOk?: (values: any) => void;
  selectedRowsKeys?: React.Key[];
}

const ACLRoles: React.FC<ACLRolesProps> = (props) => {
  const { visible, roles, onOk, onCancel, selectedRowsKeys = [] } = props;
  const [form] = Form.useForm();

  useEffect(
    () => {
      return () => {
        if (!visible) {
          form.resetFields();
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visible],
  );

  const roleOptions = useMemo(() => {
    if (roles) {
      return roles.map((role) => ({
        label: role.displayName,
        value: `${role.id}`,
      }));
    }
    return [];
  }, [roles]);

  const handleFinished = (values: any) => {
    if (onOk) {
      onOk(values);
    }
  };

  return (
    <Modal
      visible={visible}
      title={`设置选中的「${selectedRowsKeys.length}」个API的可访问角色`}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Alert
        message="操作会覆盖允许访问的角色，确定前请仔细检查"
        type="warning"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Form
        {...BACKEND.layout}
        name="setRoles"
        form={form}
        onFinish={handleFinished}
        initialValues={{ roles: ['1'] }}
      >
        <Form.Item
          label="选择角色"
          name="roles"
          rules={[{ required: true, message: '至少选中超级管理员' }]}
        >
          <Checkbox.Group options={roleOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ACLRoles;
