import React, { useEffect, useMemo, useState } from 'react';
import { history } from 'umi';
import { useRequest } from 'ahooks';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumnType } from '@ant-design/pro-table';
import type { ACLType } from '@/types/accessControlList';
import * as services from '@/services/acl';
import * as roleServices from '@/services/role';
import { Button, Modal, Space, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { SyncOutlined } from '@ant-design/icons';
import SearchBar from '@/pages/system/accessControlList/SearchBar';
import ACLEditor from '@/pages/system/accessControlList/ACLEditor';
import ACLRoles from '@/pages/system/accessControlList/ACLRoles';
import { ACL } from '@/dictionary';
import type { ACLEditorProps } from '@/pages/system/accessControlList/ACLEditor';
import type { ACLRolesProps } from '@/pages/system/accessControlList/ACLRoles';
import type { ResponseType } from '@/types/global';

interface AccessControlListProps {
  location: {
    pathname: string;
    query: any;
  };
}

const AccessControlList: React.FC<AccessControlListProps> = (props) => {
  const { location } = props;
  const { query } = location;
  const [aclEditor, setAclEditor] = useState<ACLEditorProps>({ visible: false });
  const [aclRoles, setAclRoles] = useState<ACLRolesProps>({ visible: false });
  const apiList = useRequest(services.search, { manual: true, formatResult: (res) => res.data });
  const updateApi = useRequest(services.update, { manual: true });
  const bulkUpdateApi = useRequest(services.updateBulk, { manual: true });
  const sync = useRequest(services.sync, { manual: true });
  const roles = useRequest(roleServices.searchAll, { formatResult: (res) => res.data });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    apiList.run(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const { dataSource, pageProps } = useMemo(() => {
    if (apiList.data) {
      const { list, ...restData } = apiList.data;
      return { dataSource: list, pageProps: restData };
    }
    return { dataSource: [], pageProps: { current: 1, total: 0, pageSize: 10 } };
  }, [apiList.data]);

  const handleSubmitFinish = (res: ResponseType) => {
    if (res.success) {
      if (aclEditor.visible) {
        setAclEditor({ visible: false });
      }
      if (aclRoles.visible) {
        setAclRoles({ visible: false });
        setSelectedRowKeys([]);
      }
      apiList.refresh();
    }
  };

  const handleSync = () => {
    sync.run().then(handleSubmitFinish);
  };

  const handleSubmit = (values: any) => {
    const { data } = aclEditor;
    if (data) {
      updateApi.run({ id: data.id, data: values }).then(handleSubmitFinish);
    }
  };

  const handleBulkUpdate = (values: any) => {
    Modal.confirm({
      title: '确定重置吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        bulkUpdateApi
          .run({
            id: selectedRowKeys,
            ...values,
          })
          .then(handleSubmitFinish);
      },
    });
  };

  const columns: ProColumnType<ACLType>[] = [
    {
      dataIndex: 'uri',
      title: '接口',
      width: 420,
      render: (_, record) => {
        const foundMethod = ACL.method.find((item) => item.value === record.method);
        return (
          <>
            <div>
              <Tag color={foundMethod?.color}>{record.method}</Tag>
              <code>{record.uri}</code>
            </div>
            <small>{record.description}</small>
          </>
        );
      },
    },
    {
      dataIndex: 'roles',
      title: '允许的角色',
      render: (_, record) =>
        record.roles.map((role) => <Tag key={`role-${role.id}`}>{role.displayName}</Tag>),
    },
    {
      title: '操作',
      width: 80,
      render: (_, record) => {
        return <a onClick={() => setAclEditor({ data: record, visible: true })}>编辑</a>;
      },
    },
  ];

  const options = {
    density: true,
    reload: apiList.refresh,
    fullScreen: true,
    setting: true,
  };

  return (
    <PageContainer>
      <SearchBar roles={roles.data} />
      <ProTable
        loading={apiList.loading}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        rowKey="id"
        search={false}
        options={options}
        columns={columns}
        pagination={{
          ...pageProps,
          onChange: (page, pageSize) => {
            history.push({
              pathname: history.location.pathname,
              query: { ...query, page, pageSize },
            });
          },
        }}
        dataSource={dataSource}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            loading={sync.loading}
            icon={<SyncOutlined />}
            onClick={handleSync}
          >
            同步
          </Button>,
        ]}
        tableAlertOptionRender={() => {
          return (
            <Space>
              <a onClick={() => setAclRoles({ visible: true })}>批量设置角色</a>
              <a onClick={() => setSelectedRowKeys([])}>取消选择</a>
            </Space>
          );
        }}
      />
      <ACLEditor
        {...aclEditor}
        roles={roles.data}
        onOk={handleSubmit}
        onClose={() => setAclEditor({ visible: false })}
      />
      <ACLRoles
        {...aclRoles}
        selectedRowsKeys={selectedRowKeys}
        roles={roles.data}
        onOk={handleBulkUpdate}
        onCancel={() => setAclRoles({ visible: false })}
      />
    </PageContainer>
  );
};

export default AccessControlList;
