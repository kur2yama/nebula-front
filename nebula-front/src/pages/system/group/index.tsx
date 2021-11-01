import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { Button, Popconfirm } from 'antd';
import { ToolOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import GroupEditorModal from '@/pages/system/group/GroupEditorModal';
import * as groupServices from '@/services/group';
import type { ProColumns } from '@ant-design/pro-table';
import type { GroupType } from '@/types/group';
import type { GroupEditorModalProps } from '@/pages/system/group/GroupEditorModal';
import type { ResponseType } from '@/types/global';

const GroupList: React.FC = () => {
  const [editorModal, setEditorModal] = useState<GroupEditorModalProps>({
    visible: false,
    parentId: undefined,
    data: undefined,
    mode: 'create',
  });
  const groups = useRequest(groupServices.search, { formatResult: (res) => res.data });
  const fixGroups = useRequest(groupServices.fix, { manual: true });
  const createGroup = useRequest(groupServices.create, { manual: true });
  const updateGroup = useRequest(groupServices.update, { manual: true });
  const destroyGroup = useRequest(groupServices.destroy, { manual: true });

  const handleSubmitSuccess = (res: ResponseType) => {
    if (res.success) {
      if (editorModal.visible) {
        setEditorModal({ parentId: 1, visible: false, data: undefined, mode: 'create' });
      }
      groups.refresh();
    }
    return res;
  };

  const handleFix = () => {
    fixGroups.run().then(handleSubmitSuccess);
  };

  const handleEditorOk = (values: any) => {
    const { mode, parentId, data } = editorModal;
    if (mode === 'create') {
      createGroup.run({ data: { ...values, parentId } }).then(handleSubmitSuccess);
    } else if (data && mode === 'update') {
      updateGroup.run({ id: data.id, data: values }).then(handleSubmitSuccess);
    }
  };

  const handleDestroy = (row: GroupType) => {
    destroyGroup.run({ id: row.id }).then(handleSubmitSuccess);
  };

  // 定于表格的 columns
  const columns: ProColumns<GroupType>[] = [
    {
      title: '用户组名',
      dataIndex: 'displayName',
      width: 360,
      render: (_, row) => `[${row.id}] ${row.displayName} (${row.name})`,
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 360,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      render: (value, row) => {
        const actCreate = (
          <a
            key="create"
            onClick={() =>
              setEditorModal({ visible: true, mode: 'create', parentId: row.id, data: row })
            }
          >
            新建下级
          </a>
        );
        const actUpdate = (
          <a
            key="update"
            onClick={() => setEditorModal({ visible: true, mode: 'update', data: row })}
          >
            编辑
          </a>
        );
        const actDestroy = (
          <Popconfirm key="destroy" title="确认删除?" onConfirm={() => handleDestroy(row)}>
            <a>删除</a>
          </Popconfirm>
        );

        return row.id !== 1 ? [actCreate, actUpdate, actDestroy] : [actCreate];
      },
    },
  ];

  const options = {
    density: true,
    reload: groups.refresh,
    fullScreen: true,
    setting: true,
  };

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        loading={groups.loading}
        columns={columns}
        dataSource={groups.data}
        pagination={false}
        search={false}
        defaultExpandAllRows={true}
        options={options}
        toolBarRender={() => [
          <Button key="fix" onClick={handleFix} icon={<ToolOutlined />}>
            修复
          </Button>,
        ]}
      />
      <GroupEditorModal
        {...editorModal}
        onOk={handleEditorOk}
        onCancel={() =>
          setEditorModal({ visible: false, data: undefined, parentId: undefined, mode: 'create' })
        }
      />
    </PageContainer>
  );
};

export default GroupList;
