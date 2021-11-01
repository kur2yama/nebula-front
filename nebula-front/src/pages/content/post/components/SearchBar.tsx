import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { Button, Card, Cascader, Col, Form, Input, Row, Select, Space, DatePicker } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import type { PostCategoryType } from '@/types/postCategory';
import { ancestorsById } from '@nebula/utils';
import { POST } from '@/dictionary';
import moment from 'moment';

interface SearchBarProps {
  categories?: PostCategoryType[];
}

interface QueryType {
  page?: string;
  pageSize?: string;
  keyword?: string;
  status?: string;
  tags?: string;
  dateRange?: string;
}

const { RangePicker } = DatePicker;

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { categories = [] } = props;
  const [form] = Form.useForm();
  const { pathname, query } = history.location;
  const [fold, setFold] = useState(true);

  useEffect(() => {
    const { keyword, status, tags, dateRange }: QueryType = query || {};

    const formCategoryId = (() => {
      if (categories && query && query.categoryId) {
        return ancestorsById(categories, query.categoryId);
      }
      return [];
    })();

    const formDateRange = (() => {
      if (!dateRange) {
        return [null, null];
      }
      const [startAt, endAt] = dateRange.split(',');

      return [startAt ? moment(startAt) : null, endAt ? moment(endAt) : null];
    })();

    form.setFieldsValue({
      keyword,
      categoryId: formCategoryId,
      status,
      tags: tags ? tags.split(',') : [],
      dateRange: formDateRange,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, categories]);

  const handleResetForm = () => {
    form.resetFields();
    history.push({ pathname, query: { page: '1', pageSize: '10' } });
  };

  const handleFormFinish = (values: any) => {
    const { keyword = '', categoryId, status = '', tags, dateRange } = values;

    const newDateRange = (() => {
      if (!dateRange) {
        return '';
      }
      const [startAt, endAt] = dateRange;
      return [
        startAt ? startAt.format('YYYY-MM-DD') : '',
        endAt ? endAt.format('YYYY-MM-DD') : '',
      ].join(',');
    })();

    const newQuery = {
      page: '1',
      pageSize: '10',
      keyword,
      status,
      tags: tags ? tags.join(',') : '',
      dateRange: newDateRange,
      categoryId: categoryId.length > 0 ? categoryId[categoryId.length - 1] : '',
    };

    history.push({ pathname, query: newQuery });
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Form form={form} onFinish={handleFormFinish}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="搜索" name="keyword">
              <Input placeholder="关键字" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="分类" name="categoryId">
              <Cascader
                options={categories}
                placeholder="选择分类"
                changeOnSelect
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="状态" name="status">
              <Select options={POST.status} placeholder="选择状态" allowClear />
            </Form.Item>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={handleResetForm}>重置</Button>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>

              <a onClick={() => setFold(!fold)}>
                {fold ? '展开' : '收起'}
                <span style={{ marginLeft: 6 }}>{fold ? <DownOutlined /> : <UpOutlined />}</span>
              </a>
            </Space>
          </Col>
        </Row>
        {fold ? null : (
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="标签" name="tags">
                <Select mode="tags" placeholder="选择标签" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="时间" name="dateRange">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
};

export default SearchBar;
