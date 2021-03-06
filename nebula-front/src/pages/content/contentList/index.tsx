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
    createContentList.run({ data: { title: '???????????????' } }).then(handleRequestResult);
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
      title: `???????????????${selectedRowKeys.length}?????????`,
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        bulkDestroy.run({ id: selectedRowKeys }).then(handleRequestResult);
      },
    });
  };

  const columns: ProColumnType<ContentListType>[] = [
    {
      dataIndex: 'keyword',
      title: '?????????',
      hideInTable: true,
    },
    {
      dataIndex: 'title',
      title: '?????? / ???????????? / ??????',
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
      title: '????????????(??????)',
      width: 160,
      search: false,
    },
    {
      title: '??????',
      search: false,
      width: 240,
      render: (_, record) => {
        return (
          <Space>
            <a onClick={() => setEditorDrawer({ visible: true, data: record })}>??????</a>
            <Link to={`/backend/content/contentList/update?id=${record.id}`}>??????</Link>
            <Popconfirm title="?????????????????????" onConfirm={() => handleClearCache(record)}>
              <a>????????????</a>
            </Popconfirm>
            <Popconfirm
              title="????????????????????????"
              onConfirm={() => {
                handleDestroy(record);
              }}
            >
              <a>??????</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const renderToolBar = () => {
    return [
      <Popconfirm title="?????????????????????????????????" key="create" onConfirm={handleCreate}>
        <Button type="primary" icon={<PlusOutlined />}>
          ??????????????????
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
            <a onClick={handleBulkDestroy}>????????????</a>
            <a onClick={() => setSelectedRowKeys([])}>????????????</a>
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
