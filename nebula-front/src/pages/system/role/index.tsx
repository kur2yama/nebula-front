import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { Button, Card, Popconfirm, List } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { RoleType } from '@/types/role';
import * as roleServices from '@/services/role';
import RoleEditorModal from '@/pages/system/role/RoleEditorModal';
import type { RoleEditorModalProps } from '@/pages/system/role/RoleEditorModal';
import type { ResponseType } from '@/types/global';

const RoleList: React.FC = () => {
  const [editorModal, setEditorModal] = useState<RoleEditorModalProps>({
    data: undefined,
    visible: false,
    mode: 'create',
  });
  const roles = useRequest(roleServices.search, { formatResult: (res) => res.data });
  const createRole = useRequest(roleServices.create, { manual: true });
  const updateRole = useRequest(roleServices.update, { manual: true });
  const destroyRole = useRequest(roleServices.destroy, { manual: true });

  const handleSubmitSuccess = (res: ResponseType) => {
    if (res.success) {
      if (editorModal.visible) {
        setEditorModal({ visible: false, data: undefined, mode: 'create' });
      }
      roles.refresh();
    }
    return res;
  };

  const handleModalOk = (values: any) => {
    const { mode, data } = editorModal;
    if (data && mode === 'update') {
      updateRole.run({ id: data.id, data: values }).then(handleSubmitSuccess);
    } else if (mode === 'create') {
      createRole.run({ data: values }).then(handleSubmitSuccess);
    }
  };

  const handleClickUpdate = (role: RoleType) => {
    setEditorModal({ visible: true, mode: 'update', data: role });
  };

  const handleDestroy = (role: RoleType) => {
    destroyRole.run({ id: role.id }).then(handleSubmitSuccess);
  };

  return (
    <PageContainer
      extra={
        <Button
          type="primary"
          onClick={() => setEditorModal({ mode: 'create', data: undefined, visible: true })}
          icon={<PlusOutlined />}
        >
          新建
        </Button>
      }
    >
      <List<RoleType>
        grid={{ gutter: 16, column: 4 }}
        loading={roles.loading}
        dataSource={roles.data}
        pagination={false}
        renderItem={(item) => {
          const editAction = (
            <a key="edit" onClick={() => handleClickUpdate(item)}>
              <EditOutlined />
            </a>
          );
          const destroyAction = (
            <Popconfirm key="destroy" title="确认删除?" onConfirm={() => handleDestroy(item)}>
              <a>
                <DeleteOutlined />
              </a>
            </Popconfirm>
          );

          return (
            <List.Item>
              <Card
                actions={item.id && item.id <= 4 ? [editAction] : [editAction, destroyAction]}
                title={item.displayName}
              >
                <p>
                  [{item.id}] <strong>{item.name}</strong>
                </p>
                {item.description}
              </Card>
            </List.Item>
          );
        }}
      />
      <RoleEditorModal
        {...editorModal}
        loading={createRole.loading || updateRole.loading}
        onOk={handleModalOk}
        onCancel={() => setEditorModal({ visible: false, data: undefined, mode: 'create' })}
      />
    </PageContainer>
  );
};

export default RoleList;
