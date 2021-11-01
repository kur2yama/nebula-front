import React, { useEffect, useMemo } from 'react';
import { Button, Divider, Form, Input, Radio } from 'antd';
import { ListInput } from '@nebula/pro-field';
import { THEMES } from '@/themes';
import { BACKEND, MEDIA } from '@/dictionary';
import type { SiteConfigType, SiteConfigLinkType, SiteConfigMediaType } from '@/types/site';
import type { ListInputColumn } from '@nebula/pro-field';

interface SiteConfigProfileProps {
  data?: SiteConfigType;
  onSave: (values: any) => void;
  loading?: boolean;
}

const SiteConfigProfile: React.FC<SiteConfigProfileProps> = (props) => {
  const { data, onSave, loading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const themeOptions = useMemo(() => {
    return THEMES.map((theme) => ({
      value: theme.value,
      label: theme.label,
    }));
  }, []);

  const handleSave = (values: any) => {
    onSave({
      config: {
        ...data,
        ...values,
      },
    });
  };

  const linksColumns: ListInputColumn<SiteConfigLinkType>[] = [
    { dataIndex: 'label', title: '文字' },
    { dataIndex: 'link', title: '链接' },
  ];

  const mediaColumns: ListInputColumn<SiteConfigMediaType>[] = [
    {
      dataIndex: 'fileType',
      title: '链接',
      valueType: 'select',
      valueEnum: MEDIA.fileType,
      width: 120,
    },
    { dataIndex: 'maxSize', title: '最大尺寸' },
  ];

  return (
    <Form {...BACKEND.layout} form={form} onFinish={handleSave} scrollToFirstError>
      <Form.Item label="主题" name={['profile', 'theme']}>
        <Radio.Group options={themeOptions} />
      </Form.Item>
      <Form.Item label="版权" name={['profile', 'copyright']}>
        <Input />
      </Form.Item>
      <Form.Item label="Meta Keyword" name={['profile', 'keyword']}>
        <Input />
      </Form.Item>
      <Form.Item label="Meta Description" name={['profile', 'description']}>
        <Input />
      </Form.Item>
      <Form.Item label="ICP备案" name={['profile', 'icp']}>
        <Input />
      </Form.Item>
      <Form.Item label="公安备案" name={['profile', 'policeIcp']}>
        <Input />
      </Form.Item>
      <Form.Item label="链接信息" name={['profile', 'links']}>
        <ListInput columns={linksColumns} />
      </Form.Item>
      <Form.Item label="上传配置" name={['profile', 'media']}>
        <ListInput columns={mediaColumns} />
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

export default SiteConfigProfile;
