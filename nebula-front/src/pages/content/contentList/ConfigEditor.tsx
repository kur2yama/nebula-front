import React, { useEffect, useState } from 'react';
import { history, Prompt } from 'umi';
import { useRequest, useHistoryTravel } from 'ahooks';
import { Button, Card, Dropdown, Image, Menu, notification, Popconfirm, Space } from 'antd';
import { SortableTable } from '@nebula/design';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { DownOutlined } from '@ant-design/icons';
import * as contentServices from '@/services/contentList';
import { CONTENT_LIST } from '@/dictionary';
import ConfigEditorDrawer from './components/ConfigEditorDrawer';
import PostSelectDrawer from './components/PostSelectDrawer';
import CategorySelectModal from './components/CategorySelectModal';
import ContentListSelectDrawer from './components/ContentListSelectDrawer';

import type { SortableTableColumnType } from '@nebula/design';
import type { ContentConfigType } from '@/types/contentList';
import type { ConfigEditorDrawerProps } from './components/ConfigEditorDrawer';
import type { PostSelectDrawerProps } from './components/PostSelectDrawer';
import type { CategorySelectModalProps } from './components/CategorySelectModal';
import type { ContentListSelectDrawerProps } from './components/ContentListSelectDrawer';

const ConfigEditor: React.FC = () => {
  const { query = {} } = history.location;
  const { id = null } = query;
  const content = useRequest(() => contentServices.find({ id }), {
    formatResult: (res) => res.data,
  });
  const updateContent = useRequest(contentServices.update, { manual: true });
  const [dataSource, setDataSource] = useState<ContentConfigType[] | undefined>();
  const [editor, setEditor] = useState<ConfigEditorDrawerProps>({ visible: false });
  const [postSelect, setPostSelect] = useState<PostSelectDrawerProps>({ visible: false });
  const [categorySelect, setCategorySelect] = useState<CategorySelectModalProps>({
    visible: false,
  });
  const [contentListSelect, setContentListSelect] = useState<ContentListSelectDrawerProps>({
    visible: false,
  });

  const historyTravel = useHistoryTravel<ContentConfigType[] | undefined>();

  const handleSave = (newData: ContentConfigType[] | null = null) => {
    if (content.data) {
      updateContent
        .run({
          id,
          data: {
            ...content.data,
            content: newData || dataSource,
          },
        })
        .then((res) => {
          if (res.success) {
            notification.success({ message: res.message });
            if (editor.visible) {
              setEditor({ visible: false, data: undefined });
            }
            if (postSelect.visible) {
              setPostSelect({ visible: false });
            }
            if (categorySelect.visible) {
              setCategorySelect({ visible: false });
            }
            if (contentListSelect.visible) {
              setContentListSelect({ visible: false });
            }
            content.refresh();
            historyTravel.reset(1);
          }
        });
    }
  };

  const handleSaveConfig = (configValue: any) => {
    if (dataSource) {
      const { mode, data } = editor;

      const newData = (() => {
        if (mode === 'create') {
          return [...dataSource, configValue];
        }
        if (mode === 'update' && data) {
          return dataSource.map((item) => {
            if (item.key === data?.key) {
              return configValue;
            }
            return item;
          });
        }
        return [];
      })();

      setDataSource(newData);
      handleSave(newData);
    }
  };

  const handleInsertConfig = (addData: any) => {
    if (dataSource) {
      handleSave([...dataSource, ...addData]);
    }
  };

  const handleRemoveConfig = (recode: ContentConfigType) => {
    if (dataSource) {
      const newData = dataSource.filter((item) => item.key !== recode.key);
      setDataSource(newData);
      handleSave(newData);
    }
  };

  useEffect(() => {
    if (content.data) {
      setDataSource(content.data.content);
    }
  }, [content.data]);

  useEffect(() => {
    if (dataSource) {
      historyTravel.setValue(dataSource);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  const columns: SortableTableColumnType<ContentConfigType>[] = [
    {
      dataIndex: 'contentType',
      title: '类型',
      width: 120,
      render: (v) => {
        return CONTENT_LIST.contentType.find((item) => item.value === v)?.label || v;
      },
    },
    {
      dataIndex: 'title',
      title: '标题',
      render: (_, record) => (
        <div style={{ display: 'flex' }}>
          <div>
            {record.cover ? (
              <Image src={record.cover} height={64} style={{ width: 'auto' }} />
            ) : null}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: 6,
            }}
          >
            {record.title}
            <small style={{ color: '#999' }}>{record.description}</small>
          </div>
        </div>
      ),
    },
    {
      dataIndex: 'actions',
      title: '操作',
      width: 160,
      render: (_, record) => {
        return (
          <Space>
            <a onClick={() => setEditor({ visible: true, data: record, mode: 'update' })}>编辑</a>
            <Popconfirm title="删除该内容列表" onConfirm={() => handleRemoveConfig(record)}>
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const addMenu = (
    <Menu>
      <Menu.Item key="post" onClick={() => setEditor({ visible: true, mode: 'create' })}>
        自定义内容
      </Menu.Item>
      <Menu.Item key="bulkPost" onClick={() => setPostSelect({ visible: true })}>
        文章
      </Menu.Item>
      <Menu.Item key="category" onClick={() => setCategorySelect({ visible: true })}>
        分类
      </Menu.Item>
      <Menu.Item key="contentList" onClick={() => setContentListSelect({ visible: true })}>
        内容列表
      </Menu.Item>
    </Menu>
  );

  return (
    <PageContainer onBack={history.goBack} title={`编辑 ${content.data?.title} 的内容`}>
      <Prompt when={historyTravel.backLength > 1} message="还未保存，确定离开吗?" />
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Dropdown overlay={addMenu}>
            <Button type="primary">
              添加内容 <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <SortableTable rowKey="key" columns={columns} dataSource={dataSource || []} />
      </Card>

      <ConfigEditorDrawer
        {...editor}
        onClose={() => setEditor({ visible: false, data: undefined })}
        onOk={handleSaveConfig}
      />
      <PostSelectDrawer
        {...postSelect}
        onClose={() => setPostSelect({ visible: false })}
        onOk={handleInsertConfig}
      />
      <CategorySelectModal
        {...categorySelect}
        onCancel={() => setCategorySelect({ visible: false })}
        onOk={handleInsertConfig}
      />
      <ContentListSelectDrawer
        {...contentListSelect}
        currentData={content.data}
        onClose={() => setContentListSelect({ visible: false })}
        onOk={handleInsertConfig}
      />
      <FooterToolbar>
        <Button
          type="primary"
          onClick={() => handleSave()}
          disabled={historyTravel.backLength <= 1}
        >
          保存
        </Button>
      </FooterToolbar>
    </PageContainer>
  );
};

export default ConfigEditor;
