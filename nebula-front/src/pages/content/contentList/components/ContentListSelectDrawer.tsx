import React, { useEffect, useRef, useState } from 'react';
import { Drawer, Image } from 'antd';
import ProTable from '@ant-design/pro-table';
import * as services from '@/services/contentList';
import { randomString } from '@nebula/utils';

import type { ProColumnType, ActionType } from '@ant-design/pro-table';
import type { ContentListType } from '@/types/contentList';

export interface ContentListSelectDrawerProps {
  visible: boolean;
  onClose?: () => void;
  onOk?: (values: any) => void;
  currentData?: ContentListType;
}

const ContentListSelectDrawer: React.FC<ContentListSelectDrawerProps> = (props) => {
  const { onOk, visible, onClose, currentData } = props;
  const [selectRows, setSelectRows] = useState<ContentListType[]>([]);
  const actionRef = useRef<ActionType>();

  const searchList = async (params: Record<string, any>) => {
    const { current, pageSize, ...otherQuery } = params;
    const result = await services.search({
      page: current,
      pageSize,
      ...otherQuery,
    });
    return {
      data: result.data.list,
      success: result.success,
      total: result.data.total,
    };
  };

  useEffect(() => {
    return () => {
      if (!visible) {
        setSelectRows([]);
      }
    };
  }, [visible]);

  const handleSelect = () => {
    if (onOk) {
      const data = selectRows.map((item) => {
        return {
          contentListId: item.id,
          title: item.title,
          description: item.description,
          cover: item.cover,
          key: randomString(16),
          contentType: 'contentList',
          contentListLevel: 0,
        };
      });
      onOk(data);
    }
  };

  const columns: ProColumnType<ContentListType>[] = [
    {
      dataIndex: 'title',
      title: '标题',
      render: (_, record) => {
        return (
          <div style={{ display: 'flex' }}>
            <div>{record.cover && <Image width={60} src={record.cover} />}</div>
            <div style={{ marginLeft: 6 }}>{record.title}</div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Drawer title="请选择文章列表" visible={visible} width={840} onClose={onClose}>
        <ProTable
          rowSelection={{
            selectedRowKeys: selectRows.map((item) => item.id),
            onChange: (_, rows) => {
              setSelectRows(rows);
            },
            getCheckboxProps: (record: ContentListType) => ({
              disabled: record.id === currentData?.id,
              name: record.title,
            }),
          }}
          actionRef={actionRef}
          rowKey="id"
          columns={columns}
          request={searchList}
          tableAlertOptionRender={() => [
            <a key="insert" onClick={handleSelect}>
              选择并添加
            </a>,
            <a key="cancel" onClick={() => setSelectRows([])} style={{ marginLeft: 16 }}>
              取消选择
            </a>,
          ]}
        />
      </Drawer>
    </>
  );
};

export default ContentListSelectDrawer;
