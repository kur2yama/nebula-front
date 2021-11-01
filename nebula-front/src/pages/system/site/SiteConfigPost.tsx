import React, { useEffect } from 'react';
import { Button, Divider, Form, InputNumber } from 'antd';
import { BACKEND } from '@/dictionary';
import type { SiteConfigType } from '@/types/site';

interface SiteConfigPostProps {
  data?: SiteConfigType;
  onSave: (values: any) => void;
  loading?: boolean;
}

const SiteConfigPost: React.FC<SiteConfigPostProps> = (props) => {
  const { data, onSave, loading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const handleSave = (values: any) => {
    onSave({
      config: {
        ...data,
        ...values,
      },
    });
  };

  return (
    <Form {...BACKEND.layout} form={form} onFinish={handleSave} scrollToFirstError>
      <Form.Item label="文章图集最大数" name={['post', 'maxGallery']}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="文章附件最大数" name={['post', 'maxAttachment']}>
        <InputNumber />
      </Form.Item>
      <Divider />
      <Form.Item {...BACKEND.tailLayout}>
        <Button type="primary" htmlType="submit" size="large" loading={loading}>
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SiteConfigPost;
