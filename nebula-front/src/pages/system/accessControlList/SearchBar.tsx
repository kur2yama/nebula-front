import React, { useEffect, useMemo } from 'react';
import { Button, Card, Col, Form, Input, Row, Select, Space } from 'antd';
import type { RoleType } from '@/types/role';
import { history } from 'umi';

interface SearchBarProps {
  roles?: RoleType[];
  loading?: boolean;
}

const defaultFormData: any = {
  keyword: '',
  role: undefined,
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { roles, loading } = props;
  const { query, pathname } = history.location;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const roleOptions = useMemo(() => {
    return roles
      ? roles.map((role) => ({
          label: `${role.displayName}`,
          value: `${role.id}`,
        }))
      : [];
  }, [roles]);

  const handleFormFinished = (values: any) => {
    history.push({
      pathname,
      query: {
        ...query,
        ...values,
        page: 1,
      },
    });
  };

  const handleReset = () => {
    form.resetFields();
    history.push({
      pathname,
      query: {
        ...query,
        ...defaultFormData,
        page: 1,
      },
    });
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Form form={form} onFinish={handleFormFinished} initialValues={defaultFormData}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="关键字" name="keyword">
              <Input placeholder="查询关键字" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="角色" name="role">
              <Select options={roleOptions} placeholder="请选择角色" allowClear />
            </Form.Item>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={handleReset}>重置</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                搜索
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchBar;
