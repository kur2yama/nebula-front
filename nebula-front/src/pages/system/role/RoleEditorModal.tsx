/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';

export interface RoleEditorModalProps {
  mode: string;
  visible: boolean;
  data?: any;
  onOk?: (data: any) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const fieldsRule = {
  name: [{ required: true, message: '请输入用户角色名称(英文)', pattern: RegExp('^[a-zA-Z]*$') }],
  displayName: [{ required: true, message: '请输入角色显示名' }],
};

const RoleEditorModal: React.FC<RoleEditorModalProps> = (props) => {
  const { onOk, onCancel, data, mode, visible, loading } = props;
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };

  useEffect(() => {
    if (visible && data) {
      form.setFieldsValue(data);
    }
    return () => {
      if (form && !visible) {
        form.resetFields();
      }
    };
  }, [visible, data, form]);

  const handleFormFinish = (values: any) => {
    if (onOk) {
      onOk(values);
    }
  };

  return (
    <Modal
      confirmLoading={loading}
      title={mode === 'create' ? '新建' : '编辑'}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      forceRender
    >
      <Form form={form} onFinish={handleFormFinish} {...layout}>
        <Form.Item name="name" label="角色名" rules={fieldsRule.name} extra="仅限英文">
          <Input />
        </Form.Item>
        <Form.Item name="displayName" label="显示名" rules={fieldsRule.displayName}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoleEditorModal;
