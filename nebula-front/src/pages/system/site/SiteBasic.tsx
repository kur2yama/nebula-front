import React, { useEffect } from 'react';
import { Button, Divider, Form, Input } from 'antd';
import type { SiteType } from '@/types/site';
import { MediaUpload } from '@nebula/design';
import * as mediaServices from '@/services/media';
import { BACKEND } from '@/dictionary';

const rules = {
  name: [{ required: true, message: '请填写站点名称' }],
  code: [{ required: true, message: '请填写站点Code' }],
  description: [{ required: true, message: '请填写站点描述' }],
  logo: [{ required: true, message: '请选择站点图标' }],
};

interface SiteBasicProps {
  data?: SiteType;
  onSave: (values: any) => void;
  loading?: boolean;
}

const SiteBasic: React.FC<SiteBasicProps> = (props) => {
  const { data, onSave, loading } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Form {...BACKEND.layout} form={form} onFinish={onSave}>
      <Form.Item label="站点名称" name="name" rules={rules.name}>
        <Input />
      </Form.Item>
      <Form.Item label="站点Code" name="code" rules={rules.code}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="description" rules={rules.name}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="图标" name="logo" rules={rules.logo}>
        <MediaUpload services={mediaServices} fileType={['image']} fileSize="2m" />
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

export default SiteBasic;
