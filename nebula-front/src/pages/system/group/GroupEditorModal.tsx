/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';

export interface GroupEditorModalProps {
  mode: string;
  visible: boolean;
  parentId?: number;
  data?: any;
  onOk?: (values: any) => void;
  onCancel?: () => void;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const fieldsRule = {
  name: [
    {
      required: true,
      message: '请输入用户组名称(英文和数组)',
      pattern: RegExp('^[a-zA-Z][0-9]*$'),
    },
  ],
  displayName: [{ required: true, message: '请输入显示名' }],
};

const GroupEditorModal: React.FC<GroupEditorModalProps> = (props) => {
  const { visible, data, mode, onCancel, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && data && mode === 'update') {
      form.setFieldsValue(data);
    }
    return () => {
      if (form && !visible) {
        form.resetFields();
      }
    };
  }, [data, visible, form]);

  const handleOk = () => {
    form.submit();
  };

  const handleFormFinish = (values: any) => {
    if (onOk) {
      onOk(values);
    }
  };

  return (
    <Modal
      title={
        mode === 'create'
          ? `新建 ${data ? data.displayName : ''} 的下级`
          : `更新${data ? data.displayName : ''}`
      }
      onCancel={onCancel}
      visible={visible}
      onOk={handleOk}
      forceRender
    >
      <Form form={form} onFinish={handleFormFinish} {...layout}>
        <Form.Item name="name" label="组名" rules={fieldsRule.name} extra="仅英文和数组">
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

export default GroupEditorModal;
