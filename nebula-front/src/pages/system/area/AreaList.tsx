import React from 'react';
import type { AreaType } from '@/types/area';
import { Button, Card, List, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import styles from './style.less';

export interface AreaListProps {
  loading?: boolean;
  title: string;
  dataSource?: AreaType[];
  parentId?: any;
  level: number;
  activeRecord?: AreaType;
  onActiveRecordChange?: (record: AreaType | undefined, level: number) => void;
  onCreate?: () => void;
  onUpdate?: (row: AreaType) => void;
  onDestroy?: (row: AreaType) => void;
}

const AreaList: React.FC<AreaListProps> = (props) => {
  const {
    loading,
    dataSource = [],
    title = '',
    activeRecord,
    onActiveRecordChange,
    onCreate,
    onUpdate,
    onDestroy,
    level,
  } = props;

  const actions = [
    <Tooltip title="新增" key="create">
      <Button
        type="link"
        icon={<PlusOutlined />}
        onClick={() => {
          if (onCreate) {
            onCreate();
          }
        }}
      />
    </Tooltip>,
  ];

  const handleItemUpdate = (record: AreaType) => {
    if (onUpdate) {
      onUpdate(record);
    }
  };

  const handleItemDestroy = (record: AreaType) => {
    if (onDestroy) {
      onDestroy(record);
    }
  };

  return (
    <Card title={title} bodyStyle={{ padding: 0 }} extra={actions}>
      <PerfectScrollbar className={styles.listContainer}>
        <List<AreaType>
          loading={loading}
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item
              style={{
                background: activeRecord && activeRecord.id === item.id ? '#d6e4ff' : 'none',
              }}
              onClick={() => {
                if (onActiveRecordChange) {
                  onActiveRecordChange(item.id === activeRecord?.id ? undefined : item, level);
                }
              }}
              actions={
                item.id === activeRecord?.id
                  ? [
                      <a
                        key="update"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemUpdate(item);
                        }}
                      >
                        <EditOutlined />
                      </a>,
                      <a
                        key="destroy"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemDestroy(item);
                        }}
                      >
                        <DeleteOutlined />
                      </a>,
                    ]
                  : undefined
              }
            >
              <List.Item.Meta
                title={item.name}
                description={item.displayName}
                style={{ padding: '0 16px' }}
              />
            </List.Item>
          )}
        />
      </PerfectScrollbar>
    </Card>
  );
};

export default AreaList;
