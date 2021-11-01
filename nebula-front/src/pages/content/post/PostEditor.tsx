import React, { useEffect, useMemo } from 'react';
import moment from 'moment';
import { history, useModel } from 'umi';
import { useRequest } from 'ahooks';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import {
  Cascader,
  Form,
  Input,
  Radio,
  Switch,
  Card,
  Button,
  DatePicker,
  Select,
  Tooltip,
} from 'antd';
import { ancestorsById } from '@nebula/utils';
import { InfoCircleOutlined } from '@ant-design/icons';
import { MediaUpload, HtmlEditor } from '@nebula/design';
import { BACKEND, POST } from '@/dictionary';
import { THEMES } from '@/themes';
import * as mediaService from '@/services/media';
import * as postService from '@/services/post';
import * as postCategoryService from '@/services/postCategory';

import type { ResponseType } from '@/types/global';

const rules = {
  title: [{ required: true, message: '请填写标题' }],
  categoryId: [{ required: true, message: '请选择分类' }],
};

const PostEditor: React.FC = () => {
  const { initialState = {} } = useModel('@@initialState');
  const { currentSite } = initialState;
  const { pathname, query } = history.location;
  const { id } = query || {};
  const [form] = Form.useForm();
  const mode = pathname.indexOf('create') > 0 ? 'create' : 'update';
  const createPost = useRequest(postService.create, { manual: true });
  const updatePost = useRequest(postService.update, { manual: true });
  const post = useRequest(() => postService.find({ id }), {
    manual: true,
    formatResult: (res) => res.data,
  });
  const categories = useRequest(postCategoryService.search, { formatResult: (res) => res.data });

  const handleSubmitSuccess = (res: ResponseType) => {
    if (res.success) {
      if (mode === 'create') {
        history.replace({
          pathname: '/backend/content/post/update',
          query: { id: res.data?.id },
        });
      }
    }
  };

  const handleFormFinish = (values: any) => {
    const payload: any = {
      data: {
        ...values,
        categoryId: values.categoryId[values.categoryId.length - 1],
        publishedAt: values.publishedAt
          ? values.publishedAt.format(BACKEND.dateTimeFormat)
          : moment().format(BACKEND.dateTimeFormat),
      },
    };
    if (mode === 'update') {
      payload.id = id;
      updatePost.run(payload).then(handleSubmitSuccess);
    } else {
      createPost.run(payload).then(handleSubmitSuccess);
    }
  };

  useEffect(() => {
    if (mode === 'update') {
      post.run().then((res) => {
        if (res && categories.data) {
          const newCategoryId = ancestorsById(categories.data || [], res.categoryId);
          form.setFieldsValue({
            ...res,
            categoryId: newCategoryId,
            publishedAt: moment(res.publishedAt),
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, categories.data]);

  const pageTitle = useMemo(() => {
    if (mode === 'update' && post.data) {
      return `编辑文章 「${post.data.title}」`;
    }
    return '新建文章';
  }, [mode, post.data]);

  const templateOptions = useMemo(() => {
    if (currentSite) {
      const currentTheme = THEMES.find((theme) => theme.value === currentSite.config.theme);
      return currentTheme ? currentTheme.templates.post : [];
    }
    return [];
  }, [currentSite]);

  return (
    <PageContainer title={pageTitle} onBack={history.goBack}>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFormFinish}
        initialValues={POST.defaultValue}
      >
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Card>
              <Form.Item name="title" label="标题" rules={rules.title}>
                <Input placeholder="文章标题" />
              </Form.Item>
              <Form.Item name="categoryId" label="分类" rules={rules.categoryId}>
                <Cascader options={categories.data || []} placeholder="文章分类" />
              </Form.Item>
              <Form.Item name="description" label="描述">
                <Input.TextArea placeholder="文章描述" />
              </Form.Item>
              <Form.Item name="content" label="正文">
                <HtmlEditor mediaUpload={{ services: mediaService }} minHeight={1020} />
              </Form.Item>
            </Card>
          </div>
          <div style={{ width: 460, marginLeft: 16 }}>
            <Card style={{ marginBottom: 8 }}>
              <Form.Item label="封面" name="cover">
                <MediaUpload
                  services={mediaService}
                  fileType={['image']}
                  previewType="pictureCard"
                />
              </Form.Item>
              <Form.Item label="图集" name="gallery">
                <MediaUpload
                  services={mediaService}
                  returnType="media"
                  fileType={['image', 'video']}
                  multiple
                  maxCount={currentSite?.config.post.maxGallery}
                />
              </Form.Item>
              <Form.Item label="附件" name="attachment">
                <MediaUpload
                  services={mediaService}
                  returnType="media"
                  fileType={['file', 'document']}
                  multiple
                  maxCount={currentSite?.config.post.maxAttachment}
                  previewType="text"
                />
              </Form.Item>
            </Card>
            <Card style={{ marginBottom: 8 }}>
              <Form.Item label="模板" name="template">
                <Select options={templateOptions} />
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
            </Card>
            <Card style={{ marginBottom: 8 }}>
              <Form.Item label="状态" name="status">
                <Radio.Group options={POST.status} />
              </Form.Item>
              <Form.Item label="置顶" name="isSticky" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Card>
            <Card style={{ marginBottom: 8 }}>
              <Form.Item label="作者" name="author">
                <Input />
              </Form.Item>
              <Form.Item label="编辑" name="editor">
                <Input />
              </Form.Item>
              <Form.Item label="原文链接" name="referenceLink">
                <Input />
              </Form.Item>
              <Form.Item label="发布时间" name="publishedAt">
                <DatePicker showTime />
              </Form.Item>
            </Card>
          </div>
        </div>
      </Form>

      <FooterToolbar>
        <Button onClick={history.goBack}>返回</Button>
        <Button type="primary" onClick={form.submit}>
          保存
        </Button>
      </FooterToolbar>
    </PageContainer>
  );
};
export default PostEditor;
