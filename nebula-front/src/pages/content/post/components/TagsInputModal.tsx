import React, { useEffect } from 'react';
import { Modal, Form, Select } from 'antd';
import { BACKEND } from '@/dictionary';

export interface TagsInputModalProps {
  visible: boolean;
  onOk?: (values: any) => void;
  onCancel?: () => void;
}

const TagsInputModal: React.FC<TagsInputModalProps> = (props) => {
  const { visible, onOk, onCancel } = props;
  const [form] = Form.useForm();

  const handleFormFinish = (values: any) => {
    if (onOk) {
      onOk(values);
    }
  };

  useEffect(() => {
    return () => {
      if (!visible) {
        form.resetFields();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Modal
      title="添加标签"
      onCancel={onCancel}
      visible={visible}
      onOk={() => form.submit()}
      forceRender
    >
      <Form {...BACKEND.layout} name="addTagsForm" form={form} onFinish={handleFormFinish}>
        <Form.Item
          name="tags"
          label="填写标签"
          rules={[{ required: true, message: '请填写要添加标签' }]}
        >
          <Select mode="tags" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default TagsInputModal;
