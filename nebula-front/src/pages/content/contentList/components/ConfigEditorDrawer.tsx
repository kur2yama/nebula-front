import React, { useEffect, useMemo } from 'react';
import { Form, Input, Space, Button, Drawer, Tooltip, InputNumber, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { BACKEND, CONTENT_LIST } from '@/dictionary';
import { MediaUpload } from '@nebula/design';
import * as mediaService from '@/services/media';
import { getWidth } from '@/utils';
import { randomString } from '@nebula/utils';
import type { ContentConfigType } from '@/types/contentList';

export interface ConfigEditorDrawerProps {
  visible: boolean;
  mode?: 'create' | 'update';
  data?: ContentConfigType;
  onOk?: (values: any) => void;
  onClose?: () => void;
}

const ConfigEditorDrawer: React.FC<ConfigEditorDrawerProps> = (props) => {
  const { visible, data, onOk, onClose, mode = 'create' } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && mode === 'update' && data) {
      form.setFieldsValue(data);
    }
    return () => {
      if (!visible) {
        form.resetFields();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, data]);

  const handleFormFinish = (values: any) => {
    if (onOk) {
      if (mode === 'create') {
        onOk({
          key: randomString(16),
          contentType: 'custom',
          ...values,
        });
      }
      if (mode === 'update' && data) {
        onOk({
          ...data,
          ...values,
        });
      }
    }
  };

  const title = useMemo(() => {
    if (mode === 'create') {
      return '添加自定义内容';
    }
    if (data) {
      return `编辑「${
        CONTENT_LIST.contentType.find((item) => item.value === data.contentType)?.label
      }」【${data.title}】`;
    }
    return '编辑';
  }, [data, mode]);

  return (
    <Drawer title={title} visible={visible} onClose={onClose} width={getWidth()} forceRender>
      <Form
        form={form}
        {...BACKEND.layout}
        onFinish={handleFormFinish}
        initialValues={CONTENT_LIST.configDefaultValue}
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[
            {
              required: true,
              message: '请填写标题',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="cover" label="封面">
          <MediaUpload services={mediaService} fileType={['image']} multiple={false} />
        </Form.Item>
        <Form.Item
          name="link"
          label={
            <>
              内链
              <Tooltip title="例如 /post?id=或/category?id=">
                <InfoCircleOutlined style={{ marginLeft: 6, color: '#999' }} />
              </Tooltip>
            </>
          }
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="externalLink"
          label={
            <>
              外链
              <Tooltip title="例如 https://www.baidu.com">
                <InfoCircleOutlined style={{ marginLeft: 6, color: '#999' }} />
              </Tooltip>
            </>
          }
        >
          <Input />
        </Form.Item>
        {data && data.contentType === 'category' && (
          <>
            <Form.Item label="文章数量">
              <Form.Item name="postsLength" noStyle>
                <InputNumber />
              </Form.Item>
              <span style={{ marginLeft: 16, color: '#999' }}>0 表示不限制</span>
            </Form.Item>
            <Form.Item name="postsOrderBy" label="文章排序">
              <Radio.Group options={CONTENT_LIST.orderBy} />
            </Form.Item>
          </>
        )}
        {data && data.contentType === 'contentList' && (
          <>
            <Form.Item label="嵌套层级">
              <Form.Item name="contentListLevel" noStyle>
                <InputNumber />
              </Form.Item>
              <span style={{ marginLeft: 16, color: '#999' }}>0 表示不限制</span>
            </Form.Item>
          </>
        )}

        <Form.Item {...BACKEND.tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ConfigEditorDrawer;
