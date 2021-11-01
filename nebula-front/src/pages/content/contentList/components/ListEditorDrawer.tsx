import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Space, Button, Drawer, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { BACKEND, CONTENT_LIST } from '@/dictionary';
import { MediaUpload } from '@nebula/design';
import * as mediaService from '@/services/media';
import { getWidth } from '@/utils';
import type { ContentListType } from '@/types/contentList';

export interface ListEditorDrawerProps {
  visible: boolean;
  data?: ContentListType;
  onOk?: (values: any) => void;
  onClose?: () => void;
}

const ListEditorDrawer: React.FC<ListEditorDrawerProps> = (props) => {
  const { visible, data, onOk, onClose } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && data) {
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
      onOk({
        ...values,
        cover: values.cover || null,
      });
    }
  };

  return (
    <Drawer
      title="编辑内容列表基础信息"
      visible={visible}
      onClose={onClose}
      width={getWidth()}
      forceRender
    >
      <Form
        form={form}
        {...BACKEND.layout}
        onFinish={handleFormFinish}
        initialValues={CONTENT_LIST.defaultValue}
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
        <Form.Item
          name="displayLabel"
          label={
            <>
              显示标题
              <Tooltip title="用于显示">
                <InfoCircleOutlined style={{ marginLeft: 6, color: '#999' }} />
              </Tooltip>
            </>
          }
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="cover" label="封面">
          <MediaUpload services={mediaService} fileType={['image']} multiple={false} />
        </Form.Item>
        <Form.Item label="缓存时间">
          <Form.Item name="ttl" noStyle>
            <InputNumber />
          </Form.Item>
          <span style={{ marginLeft: 16 }}>单位：分钟</span>
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

export default ListEditorDrawer;
