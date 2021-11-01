/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export interface AreaEditorModalProps {
  title: string;
  level: number;
  mode: string;
  visible: boolean;
  parentId?: number | null;
  data?: any;
  onOk?: (values: any) => void;
  onCancel?: () => void;
  callback?: () => void;
  loading?: boolean;
}

export const defaultEditorProps = {
  title: '',
  level: 0,
  visible: false,
  parentId: undefined,
  data: undefined,
  mode: 'create',
};

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const fieldsRule = {
  id: [
    {
      required: true,
      message: '请输入行政区域编码',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入行政区域名称',
    },
  ],
  displayName: [{ required: true, message: '请输入显示名' }],
};

const AreaEditorModal: React.FC<AreaEditorModalProps> = (props) => {
  const { title, visible, data, mode, onCancel, onOk, loading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && data && mode === 'update') {
      form.setFieldsValue(data);
    }

    return () => {
      if (!visible) {
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
      title={mode === 'create' ? `新建 ${title} 行政区域` : `更新 ${data ? data.name : ''} 信息`}
      onCancel={onCancel}
      visible={visible}
      onOk={handleOk}
      confirmLoading={loading}
      forceRender
    >
      <Form form={form} onFinish={handleFormFinish} {...layout}>
        <Form.Item label="行政区编码">
          <Form.Item noStyle name="id" rules={fieldsRule.id}>
            <Input style={{ width: 120 }} />
          </Form.Item>
          <span style={{ marginLeft: 16 }}>
            <a target="_blank" href="http://www.mca.gov.cn/article/sj/xzqh/">
              <InfoCircleOutlined style={{ marginRight: 8 }} />
              民政部行政区编码查询
            </a>
          </span>
        </Form.Item>
        <Form.Item name="name" label="区域名称" rules={fieldsRule.name}>
          <Input />
        </Form.Item>
        <Form.Item name="displayName" label="显示名" rules={fieldsRule.displayName}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AreaEditorModal;
