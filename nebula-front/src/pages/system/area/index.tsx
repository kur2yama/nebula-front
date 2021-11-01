import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { Button, Col, notification, Popconfirm, Row, Modal, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import * as areaServices from '@/services/area';
import { ToolOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { AreaEditorModalProps } from '@/pages/system/area/AreaEditorModal';
import AreaEditorModal, { defaultEditorProps } from '@/pages/system/area/AreaEditorModal';
import AreaList from '@/pages/system/area/AreaList';
import type { AreaListProps } from '@/pages/system/area/AreaList';
import type { AreaType } from '@/types/area';
import type { ResponseType } from '@/types/global';

const areaConfig: AreaListProps[] = [
  { title: '省/直辖市', level: 0 },
  { title: '市/州', level: 1 },
  { title: '区/县', level: 2 },
];

const AreaManager: React.FC = () => {
  const [editorModal, setEditorModal] = useState<AreaEditorModalProps>(defaultEditorProps);

  const [activeRecord, setActiveRecord] = useState<(AreaType | undefined)[]>(
    areaConfig.map(() => undefined),
  );
  const [dataSource, setDataSource] = useState<AreaType[][]>(areaConfig.map(() => []));

  const areas = useRequest(areaServices.search, {
    manual: true,
    formatResult: (res) => res.data,
    fetchKey: (params) => {
      return params.level;
    },
  });
  const createArea = useRequest(areaServices.create, { manual: true });
  const updateArea = useRequest(areaServices.update, { manual: true });
  const destroyArea = useRequest(areaServices.destroy, { manual: true });
  const fixAreas = useRequest(areaServices.fix, { manual: true });

  const setNewDataSource = (data: AreaType[], level: number) => {
    const newDataSource = dataSource.map((item, index) => {
      return index === level ? data : item;
    });

    setDataSource(newDataSource);
  };

  const setNewActiveRecord = (data: AreaType | undefined, level: number) => {
    const newActiveRecord = activeRecord.map((item, index) => {
      return index === level ? data : item;
    });

    setActiveRecord(newActiveRecord);
  };

  useEffect(() => {
    areas.run({ parentId: null, level: 0 }).then((res) => {
      setNewDataSource(res, 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFix = () => {
    fixAreas.run().then((res) => notification.success({ message: res.message }));
  };

  const handleSubmitSuccess = (res: ResponseType) => {
    if (res.success) {
      const { level, parentId } = editorModal;
      setEditorModal(defaultEditorProps);

      // 更新激活状态
      setNewActiveRecord(res.data, level);

      // 刷新当前列数据
      areas.run({ parentId, level }).then((newAreas) => {
        setNewDataSource(newAreas, level);
      });
    }
  };

  const handleEditorOk = (values: any) => {
    const { mode, parentId, data } = editorModal;
    if (mode === 'update' && data) {
      updateArea.run({ id: data.id, data: values }).then(handleSubmitSuccess);
    } else if (mode === 'create') {
      createArea.run({ data: { ...values, parentId } }).then(handleSubmitSuccess);
    }
  };

  // 当激活状态发送变化
  const handleActiveChange = (record: AreaType | undefined, level: number) => {
    // 设置激活状态
    const newActiveRecord = activeRecord.map((item, index) => {
      // 等于当前等级的
      if (index === level) {
        return record;
      }
      // 大于当前等级的全部设置为undefined
      if (index > level) {
        return undefined;
      }

      // 其余保持不变
      return item;
    });
    setActiveRecord(newActiveRecord);

    if (!record) {
      // 取消选中 清除以后所有的 dataSource
      const newDataSource = dataSource.map((item, index) => {
        // 大于当前等级的数据全部清空
        if (index >= level + 1) {
          return [];
        }
        return item;
      });
      setDataSource(newDataSource);
    } else if (record && level + 1 <= areaConfig.length - 1) {
      // 如果有选择，且不是最后一列，或者加载下一列的数据，并清除下一列以后的数据
      areas.run({ parentId: record.id, level: level + 1 }).then((res) => {
        const newData = dataSource.map((item, index) => {
          if (index === level + 1) {
            return res;
          }
          if (index > level + 1) {
            return [];
          }
          return item;
        });
        setDataSource(newData);
      });
    }
  };

  const handleDestroy = (row: AreaType, level: number) => {
    Modal.confirm({
      title: `确认删除 ${row.name} 吗?`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        destroyArea.run({ id: row.id }).then((res) => {
          notification.success({ message: res.message });
          // 清除当前选中
          setNewActiveRecord(undefined, level);
          // 刷新当前页
          areas.run({ parentId: row.parentId }).then((newAreas) => {
            setNewDataSource(newAreas, level);
          });
        });
      },
    });
  };

  return (
    <PageContainer
      extra={
        <Space>
          <a target="_blank" href={`http://www.mca.gov.cn/article/sj/xzqh/`}>
            <Button type="link" icon={<InfoCircleOutlined />}>
              民政部行政区编码查询
            </Button>
          </a>
          <Popconfirm title="确定修复吗?" onConfirm={handleFix}>
            <Button type="link" icon={<ToolOutlined />} loading={fixAreas.loading}>
              修复数据
            </Button>
          </Popconfirm>
        </Space>
      }
    >
      <Row gutter={8}>
        {areaConfig.map((item, index) => (
          <Col span={8} key={`col-${item.level}`}>
            <AreaList
              {...item}
              loading={areas.fetches[index]?.loading}
              dataSource={dataSource[index]}
              activeRecord={activeRecord[index]}
              onActiveRecordChange={handleActiveChange}
              onCreate={() =>
                setEditorModal({
                  level: index,
                  mode: 'create',
                  title: item.title,
                  visible: true,
                  parentId: index <= 0 ? null : activeRecord[index - 1]?.id,
                })
              }
              onUpdate={(record) =>
                setEditorModal({
                  level: index,
                  mode: 'update',
                  title: item.title,
                  visible: true,
                  data: record,
                  parentId: record.parentId,
                })
              }
              onDestroy={(record) => handleDestroy(record, index)}
            />
          </Col>
        ))}
      </Row>
      <AreaEditorModal
        {...editorModal}
        loading={createArea.loading || updateArea.loading}
        onOk={handleEditorOk}
        onCancel={() => setEditorModal(defaultEditorProps)}
      />
    </PageContainer>
  );
};

export default AreaManager;
