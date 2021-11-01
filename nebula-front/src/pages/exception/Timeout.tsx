import React from 'react';
import { Button, Result } from 'antd';
import { history } from 'umi';

const Timeout: React.FC = () => {
  return (
    <Result
      status="warning"
      title="网络好像不咋太行."
      extra={
        <Button type="primary" key="console" onClick={history.goBack}>
          刷新
        </Button>
      }
    />
  );
};

export default Timeout;
