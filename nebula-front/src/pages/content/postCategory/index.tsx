import React, { useMemo, useState } from 'react';
import { useModel } from 'umi';
import { useRequest } from 'ahooks';
import { Button, Popconfirm, Space, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ToolOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { THEMES } from '@/themes';
import CategoryEditorDrawer, {
  defaultCategoryEditor,
} from '@/pages/content/postCategory/CategoryEditorDrawer';
import * as services from '@/services/postCategory';
import type { ProColumnType } from '@ant-design/pro-table';
import type { PostCategoryType } from '@/types/postCategory';
import type { CategoryEditorDrawerProps } from '@/pages/content/postCategory/CategoryEditorDrawer';
import type { ResponseType } from '@/types/global';

const PostCategory: React.FC = () => {
  const { initialState = {} } = useModel('@@initialState');
  const { currentSite } = initialState;
  const [categoryEditor, setCategoryEditor] =
    useState<CategoryEditorDrawerProps>(defaultCategoryEditor);
  const categories = useRequest(services.search, { formatResult: (res) => res.data });
  const fixCategories = useRequest(services.fix, { manual: true });
  const createCategory = useRequest(services.create, { manual: true });
  const updateCategory = useRequest(services.update, { manual: true });
  const destroyCategory = useRequest(services.destroy, { manual: true });

  const templateOptions = useMemo(() => {
    if (currentSite) {
      const currentTheme = THEMES.find((theme) => theme.value === currentSite.config.theme);
      return currentTheme ? currentTheme.templates.category : [];
    }
    return [];
  }, [currentSite]);

  const handleSubmitSuccess = (res: ResponseType) => {
    if (res.success) {
      if (categoryEditor.visible) {
        setCategoryEditor({ parentId: 1, visible: false, data: undefined, mode: 'create' });
      }
      categories.refresh();
    }
  };

  const handleSubmit = (values: any) => {
    const { mode, data } = categoryEditor;
    if (data && mode === 'update') {
      updateCategory.run({ id: data.id, data: values }).then(handleSubmitSuccess);
    } else if (mode === 'create') {
      createCategory.run({ data: values }).then(handleSubmitSuccess);
    }
  };

  const handleDestroy = (record: PostCategoryType) => {
    destroyCategory.run({ id: record.id }).then(handleSubmitSuccess);
  };

  const handleFix = () => {
    fixCategories.run().then(handleSubmitSuccess);
  };

  const columns: ProColumnType<PostCategoryType>[] = [
    {
      dataIndex: 'name',
      width: 460,
      title: '分类名称',
      render: (_, record) => {
        return (
          <>
            {record.name} <Tag>{record.id}</Tag>
          </>
        );
      },
    },
    { dataIndex: 'sort', width: 120, title: '排序' },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <Space>
            <a
              onClick={() =>
                setCategoryEditor({
                  mode: 'create',
                  parentId: record.id,
                  data: record,
                  visible: true,
                })
              }
            >
              新建下级
            </a>
            <a onClick={() => setCategoryEditor({ mode: 'update', data: record, visible: true })}>
              编辑
            </a>
            <Popconfirm title="确认删除？" onConfirm={() => handleDestroy(record)}>
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const options = {
    density: true,
    reload: categories.refresh,
    fullScreen: true,
    setting: true,
  };

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        search={false}
        loading={categories.loading}
        dataSource={categories.data}
        columns={columns}
        pagination={false}
        options={options}
        defaultExpandAllRows
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => setCategoryEditor({ mode: 'create', visible: true, parentId: null })}
            icon={<PlusOutlined />}
          >
            新建
          </Button>,
          <Button key="fix" onClick={handleFix} icon={<ToolOutlined />}>
            修复
          </Button>,
        ]}
      />
      <CategoryEditorDrawer
        {...categoryEditor}
        onSave={handleSubmit}
        onClose={() => setCategoryEditor(defaultCategoryEditor)}
        templateOptions={templateOptions}
      />
    </PageContainer>
  );
};

export default PostCategory;
