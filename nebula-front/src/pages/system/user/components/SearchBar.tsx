/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { Card, Form, Row, Col, Input, Button, Space, Select, Cascader } from 'antd';
import { USER } from '@/dictionary';
import { transData } from '@nebula/utils';
import type { RoleType } from '@/types/role';
import type { GroupType } from '@/types/group';

export interface SearchQueryType {
  page?: string | number;
  pageSize?: string | number;
  keyword?: string;
  roles?: string;
  groups?: string;
  enabled?: string;
}

interface SearchBarProps {
  roles?: RoleType[];
  groups?: GroupType[];
  onSearch?: (params: any) => void;
  query?: SearchQueryType;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { query, roles = [], groups = [], onSearch } = props;
  const [form] = Form.useForm();

  const groupData = useMemo(() => {
    return transData(groups, 'displayName');
  }, [groups]);

  const roleData = useMemo(() => {
    return roles.map((role) => ({ label: role.displayName, value: `${role.id}` }));
  }, [roles]);

  useEffect(() => {
    form.setFieldsValue({
      ...query,
    });
  }, [query]);

  const handleFormFinish = (values: SearchQueryType) => {
    if (onSearch) {
      onSearch({
        page: 1,
        pageSize: 10,
        ...values,
      });
    }
  };

  const handleSearchBtn = () => {
    form.submit();
  };

  const handleResetBtn = () => {
    form.resetFields();
    if (onSearch) {
      onSearch({ page: '1', pageSize: '10' });
    }
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Form form={form} onFinish={handleFormFinish}>
        <Row gutter={32}>
          <Col span={8}>
            <Form.Item name="keyword" label="关键字">
              <Input placeholder="手机号/Email" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="role" label="角色">
              <Select placeholder="请选择" options={roleData} allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="group" label="用户组">
              <Cascader options={groupData} placeholder="请选择" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={8}>
            <Form.Item name="enabled" label="状态">
              <Select placeholder="请选择" options={USER.status} allowClear />
            </Form.Item>
          </Col>
          <Col span={16} style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={handleSearchBtn}>搜索</Button>
              <Button onClick={handleResetBtn}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchBar;
