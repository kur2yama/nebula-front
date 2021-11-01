import React, { useEffect } from 'react';
import { Modal, Form, Cascader } from 'antd';
import { BACKEND } from '@/dictionary';
import type { PostCategoryType } from '@/types/postCategory';

export interface CategorySelectModalProps {
  visible: boolean;
  categories?: PostCategoryType[];
  onOk?: (values: any) => void;
  onCancel?: () => void;
}

const CategorySelectModal: React.FC<CategorySelectModalProps> = (props) => {
  const { visible, onOk, onCancel, categories = [] } = props;
  const [form] = Form.useForm();

  const handleFormFinish = (values: any) => {
    if (onOk) {
      onOk({
        categoryId: values.categoryId[values.categoryId.length - 1],
      });
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
      <Form {...BACKEND.layout} name="categorySelectForm" form={form} onFinish={handleFormFinish}>
        <Form.Item
          name="categoryId"
          label="选择分类"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Cascader options={categories} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CategorySelectModal;
