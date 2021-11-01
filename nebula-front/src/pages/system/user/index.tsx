import React, { useEffect, useMemo, useState } from 'react';
import { history } from 'umi';
import { useRequest } from 'ahooks';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import SearchBar from '@/pages/system/user/components/SearchBar';
import UserEditorDrawer, {
  defaultUserEditor,
} from '@/pages/system/user/components/UserEditorDrawer';
import ResetPwdModal, { defaultResetPwd } from '@/pages/system/user/components/ResetPwdModal';
import { USER } from '@/dictionary';
import * as userServices from '@/services/user';
import * as groupServices from '@/services/group';
import * as roleServices from '@/services/role';
import type { UserEditorDrawerProps } from '@/pages/system/user/components/UserEditorDrawer';
import type { ResetPwdModalProps } from '@/pages/system/user/components/ResetPwdModal';
import type { ProColumns } from '@ant-design/pro-table';
import type { UserType } from '@/types/user';
import type { ResponseType } from '@/types/global';

interface UserListProps {
  location: {
    pathname: string;
    query: any;
  };
}

const UserList: React.FC<UserListProps> = (props) => {
  const { location } = props;
  const { query, pathname } = location;
  const users = useRequest(userServices.search, { manual: true, formatResult: (res) => res.data });
  const createUser = useRequest(userServices.create, { manual: true });
  const updateUser = useRequest(userServices.update, { manual: true });
  const resetUserPwd = useRequest(userServices.resetPwd, { manual: true });
  const destroyUser = useRequest(userServices.destroy, { manual: true });
  const roles = useRequest(roleServices.search, { formatResult: (res) => res.data });
  const groups = useRequest(groupServices.search, { formatResult: (res) => res.data });

  const [userEditor, setUserEditor] = useState<UserEditorDrawerProps>(defaultUserEditor);
  const [resetPwd, setResetPwd] = useState<ResetPwdModalProps>(defaultResetPwd);

  useEffect(() => {
    users.run(query).catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const { dataSource, pageProps } = useMemo(() => {
    if (users.data) {
      const { list, ...restData } = users.data;
      return { dataSource: list, pageProps: restData };
    }
    return { dataSource: [], pageProps: { current: 1, total: 0, pageSize: 10 } };
  }, [users.data]);

  const handleSubmitFinish = (res: ResponseType) => {
    if (res.success) {
      if (userEditor.visible) {
        setUserEditor(defaultUserEditor);
      }
      if (resetPwd.visible) {
        setResetPwd(defaultResetPwd);
      }

      users.refresh();
    }
  };

  const handleEditorSubmit = (values: any) => {
    const { data, mode } = userEditor;
    if (mode === 'create') {
      createUser.run({ data: values }).then(handleSubmitFinish);
    } else if (data && mode === 'update') {
      updateUser.run({ id: data.id, data: values }).then(handleSubmitFinish);
    }
  };

  const handleResetPwd = (values: any) => {
    const { data } = resetPwd;
    if (data) {
      resetUserPwd.run({ id: data.id, data: values }).then(handleSubmitFinish);
    }
  };

  const handleDestroy = (record: UserType) => {
    Modal.confirm({
      onOk: () => {
        destroyUser.run({ id: record.id }).then(handleSubmitFinish);
      },
    });
  };

  const columns: ProColumns<UserType>[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 64,
      render: (value) => <Avatar src={value} />,
    },
    {
      title: '用户名/Email',
      dataIndex: 'username',
      width: 200,
      render: (_, row) => (
        <>
          {row.username} <br /> {row.email}
        </>
      ),
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      width: 200,
    },
    {
      title: '角色',
      dataIndex: 'roles',
      render: (_, row) => (
        <>
          {row.roles.map((role) => (
            <Tag key={role.id}>{role.displayName}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '用户组',
      dataIndex: 'groups',
      render: (_, row) => (
        <>
          {row.groups.map((group) => (
            <Tag key={group.id}>{group.displayName}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (value) => {
        const currentStatus = USER.status.find((item) => item.value === value);
        return currentStatus ? <>{currentStatus.label}</> : null;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      width: 160,
      render: (value, record) => [
        <a
          key="update"
          onClick={() => setUserEditor({ visible: true, mode: 'update', data: record })}
        >
          编辑
        </a>,
        <a key="resetPwd" onClick={() => setResetPwd({ visible: true, data: record })}>
          重置密码
        </a>,
        <a key="destroy" onClick={() => handleDestroy(record)}>
          删除
        </a>,
      ],
    },
  ];

  // 控制 proTable右边的4个图标
  const options = {
    density: true,
    reload: users.refresh,
    fullScreen: true,
    setting: true,
  };

  return (
    <PageContainer>
      <SearchBar
        query={query}
        roles={roles.data}
        groups={groups.data}
        onSearch={(values) => {
          return history.push({ pathname, query: values });
        }}
      />
      <ProTable
        rowKey="id"
        rowSelection={{}}
        loading={users.loading}
        columns={columns}
        pagination={{
          ...pageProps,
          onChange: (page: any, pageSize: any) => {
            history.push({ pathname, query: { ...query, page, pageSize } });
          },
        }}
        dataSource={dataSource}
        search={false}
        options={options}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setUserEditor({ visible: true, mode: 'create' })}
          >
            新建
          </Button>,
        ]}
      />
      <UserEditorDrawer
        {...userEditor}
        groups={groups.data}
        roles={roles.data}
        onSubmit={handleEditorSubmit}
        onClose={() => setUserEditor(defaultUserEditor)}
      />
      <ResetPwdModal
        {...resetPwd}
        loading={resetUserPwd.loading}
        onOk={handleResetPwd}
        onCancel={() => setResetPwd(defaultResetPwd)}
      />
    </PageContainer>
  );
};

export default UserList;
