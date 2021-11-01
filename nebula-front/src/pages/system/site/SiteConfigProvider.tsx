import React, { useEffect } from 'react';
import { Button, Divider, Form, Input } from 'antd';
import { BACKEND } from '@/dictionary';
import type { SiteConfigType } from '@/types/site';

interface SiteConfigProviderProps {
  data?: SiteConfigType;
  onSave: (values: any) => void;
  loading?: boolean;
}

const SiteConfigProvider: React.FC<SiteConfigProviderProps> = (props) => {
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
      <Form.Item label="长江云SiteId" name={['provider', 'cjySiteId']}>
        <Input />
      </Form.Item>
      <Form.Item label="长江云AppId" name={['provider', 'cjyAppId']}>
        <Input />
      </Form.Item>
      <Form.Item label="长江云AppSecret" name={['provider', 'cjyAppSecret']}>
        <Input />
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

export default SiteConfigProvider;
