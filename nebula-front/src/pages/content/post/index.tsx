import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { history, Link } from 'umi';
import { useRequest } from 'ahooks';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Image, Space, Tag, Modal, Menu, Dropdown } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import SearchBar from '@/pages/content/post/components/SearchBar';
import PostPreviewer from '@/pages/content/post/components/PostPreviewer';
import TagsInputModal from '@/pages/content/post/components/TagsInputModal';
import CategorySelectModal from '@/pages/content/post/components/CategorySelectModal';
import * as postServices from '@/services/post';
import * as categoryServices from '@/services/postCategory';
import { POST } from '@/dictionary';
import type { ProColumnType } from '@ant-design/pro-table';
import type { TagsInputModalProps } from '@/pages/content/post/components/TagsInputModal';
import type { CategorySelectModalProps } from '@/pages/content/post/components/CategorySelectModal';
import type { PostType } from '@/types/post';
import type { PostPreviewerProps } from '@/pages/content/post/components/PostPreviewer';
import type { ResponseType } from '@/types/global';

const Post: React.FC = () => {
  const { pathname, query } = history.location;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tagsInput, setTagsInput] = useState<TagsInputModalProps>({ visible: false });
  const [categorySelect, setCategorySelect] = useState<CategorySelectModalProps>({
    visible: false,
  });
  const [postPreviewer, setPostPreviewer] = useState<PostPreviewerProps>({ visible: false });
  const posts = useRequest(postServices.list, {
    manual: true,
    formatResult: (res) => res.data,
  });
  const categories = useRequest(categoryServices.search, { formatResult: (res) => res.data });
  const destroyPost = useRequest(postServices.destroy, { manual: true });
  const bulkUpdate = useRequest(postServices.bulkUpdate, { manual: true });
  const bulkDestroy = useRequest(postServices.bulkDestroy, { manual: true });

  useEffect(() => {
    posts.run(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const { dataSource, pageProps } = useMemo(() => {
    if (posts.data) {
      const { list, ...restData } = posts.data;
      return { dataSource: list, pageProps: restData };
    }
    return { dataSource: [], pageProps: { current: 1, total: 0, pageSize: 10 } };
  }, [posts.data]);

  const handleSubmitFinished = (res: ResponseType) => {
    if (res.success) {
      if (tagsInput.visible) {
        setTagsInput({ visible: false });
      }
      if (categorySelect.visible) {
        setCategorySelect({ visible: false });
      }
      posts.refresh().catch();
    }
  };

  const handleDestroy = (record: PostType) => {
    Modal.confirm({
      title: `??????`,
      icon: <ExclamationCircleOutlined />,
      content: `?????????????????? ???${record.title}?????????`,
      onOk: () => {
        destroyPost.run({ id: record.id }).then(handleSubmitFinished);
      },
    });
  };

  const handleBulkDestroy = () => {
    Modal.confirm({
      title: '????????????????????????',
      icon: <ExclamationCircleOutlined />,
      onOk: () =>
        bulkDestroy
          .run({ id: selectedRowKeys })
          .then(handleSubmitFinished)
          .then(() => setSelectedRowKeys([])),
    });
  };

  const handleBulkUpdate = (data: any, title = '??????????????????') => {
    Modal.confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      onOk: () => bulkUpdate.run({ id: selectedRowKeys, ...data }).then(handleSubmitFinished),
    });
  };

  const statusMenu = (
    <Menu onClick={({ key }) => handleBulkUpdate({ status: key }, '?????????????????????')}>
      {POST.status.map((item) => (
        <Menu.Item key={item.value}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  const stickyMenu = (
    <Menu onClick={({ key }) => handleBulkUpdate({ isSticky: key })}>
      {POST.sticky.map((item) => (
        <Menu.Item key={item.value}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  const renderTags = (tags: string[]) => tags.map((tag) => <Tag key={`tag-${tag}`}>{tag}</Tag>);
  const renderPostStatus = (recode: PostType) => {
    const foundStatus = POST.status.find((item) => item.value === recode.status);
    return foundStatus ? <Tag color={foundStatus.color}>{foundStatus.label}</Tag> : null;
  };
  const columns: ProColumnType<PostType>[] = [
    { dataIndex: 'id', title: '??????', width: 160, render: (_, record) => record.category.title },
    {
      dataIndex: 'title',
      title: '??????',
      render: (_, record) => {
        return (
          <div style={{ display: 'flex' }}>
            <div>{record.cover && <Image width={60} src={record.cover} />}</div>
            <div style={{ marginLeft: 6 }}>
              <div>
                {record.isSticky ? <Tag color="#108ee9">??????</Tag> : null}
                <a onClick={() => setPostPreviewer({ visible: true, data: record })}>
                  {record.title}
                </a>
              </div>
              <div>{renderTags(record.tags)}</div>
            </div>
          </div>
        );
      },
    },
    { dataIndex: 'pageViews', title: '?????????', width: 80 },
    {
      dataIndex: 'status',
      title: '??????',
      width: 80,
      render: (_, record) => renderPostStatus(record),
    },
    {
      dataIndex: 'publishedAt',
      title: '????????????/????????????',
      width: 180,
      render: (_, record) => {
        return (
          <div>
            <div>{record.publishedAt}</div>
            <small>{moment(record.createdAt).format('YYYY-MM-DD HH:mm')}</small>
          </div>
        );
      },
    },
    {
      title: '??????',
      width: 180,
      render: (_, record) => {
        return (
          <Space>
            <a onClick={() => setPostPreviewer({ visible: true, data: record })}>??????</a>
            <Link to={`/backend/content/post/update?id=${record.id}`}>??????</Link>
            <a onClick={() => handleDestroy(record)}>??????</a>
          </Space>
        );
      },
    },
  ];
  const options = {
    density: true,
    reload: posts.refresh,
    fullScreen: true,
    setting: true,
  };

  return (
    <PageContainer>
      <SearchBar categories={categories.data} />
      <ProTable
        rowKey="id"
        search={false}
        loading={posts.loading}
        columns={columns}
        dataSource={dataSource}
        options={options}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        pagination={{
          ...pageProps,
          size: 'small',
          onChange: (changedPage, changedPageSize) =>
            history.push({
              pathname,
              query: { ...query, page: `${changedPage}`, pageSize: `${changedPageSize}` },
            }),
        }}
        toolBarRender={() => [
          <Link to={`/backend/content/post/create`}>
            <Button type="primary" icon={<PlusOutlined />}>
              ????????????
            </Button>
          </Link>,
        ]}
        tableAlertOptionRender={() => {
          return (
            <>
              <Button type="link" onClick={handleBulkDestroy}>
                ????????????
              </Button>
              <Button type="link" onClick={() => setCategorySelect({ visible: true })}>
                ????????????
              </Button>
              <Button type="link" onClick={() => setTagsInput({ visible: true })}>
                ????????????
              </Button>
              <Dropdown overlay={stickyMenu}>
                <Button type="link">
                  ???????????? <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={statusMenu}>
                <Button type="link">
                  ???????????? <DownOutlined />
                </Button>
              </Dropdown>
              <Button type="link" onClick={() => setSelectedRowKeys([])}>
                ????????????
              </Button>
            </>
          );
        }}
      />
      <PostPreviewer {...postPreviewer} onClose={() => setPostPreviewer({ visible: false })} />
      <TagsInputModal
        {...tagsInput}
        onCancel={() => setTagsInput({ visible: false })}
        onOk={(values: any) => handleBulkUpdate(values, '?????????????????????')}
      />
      <CategorySelectModal
        {...categorySelect}
        categories={categories.data}
        onCancel={() => setCategorySelect({ visible: false })}
        onOk={(values: any) => handleBulkUpdate(values, '?????????????????????')}
      />
    </PageContainer>
  );
};

export default Post;
