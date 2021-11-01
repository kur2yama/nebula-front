import React, { useEffect, useMemo } from 'react';
import { Drawer, Form, Button, Input, InputNumber, Select, Tooltip } from 'antd';
import { MediaUpload } from '@nebula/design';
import { getWidth } from '@/utils';
import { BACKEND, POST_CATEGORY } from '@/dictionary';
import { InfoCircleOutlined } from '@ant-design/icons';
import * as mediaService from '@/services/media';
import type { PostCategoryType } from '@/types/postCategory';

export interface CategoryEditorDrawerProps {
  visible: boolean;
  parentId?: any;
  mode: 'create' | 'update';
  data?: PostCategoryType;
  onSave?: (values: any) => void;
  onClose?: () => void;
  templateOptions?: {
    label: string;
    value: string;
  }[];
}

export const defaultCategoryEditor: CategoryEditorDrawerProps = {
  visible: false,
  mode: 'create',
  parentId: null,
};

const rules = {
  name: [{ required: true, message: '请填写分类名称' }],
  sort: [{ required: true, message: '请填写排序' }],
  template: [{ required: true, message: '请选择模板' }],
};

const CategoryEditorDrawer: React.FC<CategoryEditorDrawerProps> = (props) => {
  const { visible, mode, data, onSave, onClose, parentId, templateOptions = [] } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === 'update' && data) {
      form.setFieldsValue(data);
    }

    return () => {
      if (!visible) {
        form.resetFields();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleFinish = (values: any) => {
    if (onSave) {
      onSave({
        ...values,
        parentId,
      });
    }
  };

  const title = useMemo(() => {
    if (mode === 'update' && data) {
      return `编辑 ${data.title}`;
    }
    if (mode === 'create' && parentId && data) {
      return `新建 「${data.title}」 的下级`;
    }
    if (mode === 'create' && !parentId) {
      return '新建分类';
    }

    return ``;
  }, [mode, data, parentId]);

  return (
    <Drawer title={title} visible={visible} onClose={onClose} width={getWidth()} forceRender>
      <Form
        {...BACKEND.layout}
        form={form}
        onFinish={handleFinish}
        initialValues={POST_CATEGORY.defaultValue}
      >
        <Form.Item label="分类名称" name="name" rules={rules.name}>
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="排序" name="sort" rules={rules.sort}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="封面" name="cover">
          <MediaUpload services={mediaService} fileType={['image']} fileSize="2m" />
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
        <Form.Item label="模板" name="template" rules={rules.template}>
          <Select options={templateOptions} />
        </Form.Item>
        <Form.Item {...BACKEND.tailLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CategoryEditorDrawer;
