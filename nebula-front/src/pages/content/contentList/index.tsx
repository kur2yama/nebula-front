import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import ProTable from '@ant-design/pro-table';
import { Image, Button, Space, Popconfirm, Typography, Modal } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { URI } from '@/constants';
import PreviewDrawer from './components/PreviewDrawer';
import ListEditorDrawer from './components/ListEditorDrawer';
import * as contentServices from '@/services/contentList';
import type { ContentListType } from '@/types/contentList';
import type { ProColumnType } from '@ant-design/pro-table';
import type { ListEditorDrawerProps } from './components/ListEditorDrawer';
import type { PreviewDrawerProps } from './components/PreviewDrawer';
import type { ResponseType } from '@/types/global';
import { history } from '@@/core/history';

const { Paragraph } = Typography;

const ContentList = () => {
  const { pathname, query } = history.location;
  const [editorDrawer, setEditorDrawer] = useState<ListEditorDrawerProps>({
    visible: false,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [previewDrawer, setPreviewDrawer] = useState<PreviewDrawerProps>({ visible: false });
  const bulkDestroy = useRequest(contentServices.bulkDestroy, { manual: true });

  const search = useRequest(contentServices.search, {
    manual: true,
    formatResult: (res) => res.data,
  });
  const createContentList = useRequest(contentServices.create, { manual: true });
  const updateContentList = useRequest(contentServices.update, { manual: true });
  const destroyContentList = useRequest(contentServices.destroy, { manual: true });
  const clearCache = useRequest(contentServices.clearCache, { manual: true });

  useEffect(() => {
    search.run(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const { dataSource, pageProps } = useMemo(() => {
    if (search.data) {
      const { list, ...restData } = search.data;
      return { dataSource: list, pageProps: restData };
    }
    return { dataSource: [], pageProps: { current: 1, total: 0, pageSize: 10 } };
  }, [search.data]);

  const handleRequestResult = (res: ResponseType) => {
    if (res.success) {
      if (editorDrawer.visible) {
        setEditorDrawer({ visible: false, data: undefined });
      }
      if (selectedRowKeys.length > 0) {
        setSelectedRowKeys([]);
      }
      search.refresh();
    }
  };

  const handleCreate = () => {
    createContentList.run({ data: { title: '新内容列表' } }).then(handleRequestResult);
  };

  const handleUpdate = (values: any) => {
    const { data } = editorDrawer;
    if (data) {
      updateContentList.run({ id: data.id, data: values }).then(handleRequestResult);
    }
  };

  const handleClearCache = (record: ContentListType) => {
    clearCache.run({ id: record.id }).then(handleRequestResult);
  };

  const handleDestroy = (record: ContentListType) => {
    destroyContentList.run({ id: record.id }).then(handleRequestResult);
  };

  const handleBulkDestroy = () => {
    Modal.confirm({
      title: `确定删除这${selectedRowKeys.length}项吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        bulkDestroy.run({ id: selectedRowKeys }).then(handleRequestResult);
      },
    });
  };

  const columns: ProColumnType<ContentListType>[] = [
    {
      dataIndex: 'keyword',
      title: '关键字',
      hideInTable: true,
    },
    {
      dataIndex: 'title',
      title: '标题 / 显示标题 / 描述',
      hideInSearch: true,
      render: (_, record) => (
        <div style={{ display: 'flex' }}>
          <div>{record.cover && <Image width={60} src={record.cover} />}</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paragraph copyable={{ text: `${URI.api}/v1/content/${record.id}` }}>
              <a onClick={() => setPreviewDrawer({ visible: true, data: record })}>
                {record.title}
              </a>
            </Paragraph>
            <small style={{ color: '#999' }}>{record.description}</small>
          </div>
        </div>
      ),
    },
    {
      dataIndex: 'ttl',
      title: '缓存时间(分钟)',
      width: 160,
      search: false,
    },
    {
      title: '操作',
      search: false,
      width: 240,
      render: (_, record) => {
        return (
          <Space>
            <a onClick={() => setEditorDrawer({ visible: true, data: record })}>编辑</a>
            <Link to={`/backend/content/contentList/update?id=${record.id}`}>内容</Link>
            <Popconfirm title="确认清楚缓存？" onConfirm={() => handleClearCache(record)}>
              <a>清除缓存</a>
            </Popconfirm>
            <Popconfirm
              title="删除该内容列表？"
              onConfirm={() => {
                handleDestroy(record);
              }}
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const renderToolBar = () => {
    return [
      <Popconfirm title="确认创建新内容列表吗？" key="create" onConfirm={handleCreate}>
        <Button type="primary" icon={<PlusOutlined />}>
          新建内容列表
        </Button>
      </Popconfirm>,
    ];
  };

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        toolBarRender={renderToolBar}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          ...pageProps,
          size: 'small',
          onChange: (changedPage, changedPageSize) =>
            history.push({
              pathname,
              query: { ...query, page: `${changedPage}`, pageSize: `${changedPageSize}` },
            }),
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        tableAlertOptionRender={() => (
          <Space>
            <a onClick={handleBulkDestroy}>批量删除</a>
            <a onClick={() => setSelectedRowKeys([])}>取消选择</a>
          </Space>
        )}
      />
      <ListEditorDrawer
        {...editorDrawer}
        onOk={handleUpdate}
        onClose={() => setEditorDrawer({ visible: false })}
      />
      <PreviewDrawer
        {...previewDrawer}
        onClose={() => setPreviewDrawer({ visible: false, data: undefined })}
      />
    </PageContainer>
  );
};

export default ContentList;
