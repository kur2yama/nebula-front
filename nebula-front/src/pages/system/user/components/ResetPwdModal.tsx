/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import type { UserType } from '@/types/user';

export interface ResetPwdModalProps {
  visible: boolean;
  data?: UserType;
  loading?: boolean;
  onOk?: (values: any) => void;
  onCancel?: () => void;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

export const defaultResetPwd = {
  visible: false,
  data: undefined,
};

const ResetPwdModal: React.FC<ResetPwdModalProps> = (props) => {
  const { visible, onOk, onCancel, loading } = props;
  const [form] = Form.useForm();
  const handleFormFinish = (values: any) => {
    if (onOk) {
      onOk(values);
    }
  };

  useEffect(() => {
    return () => {
      if (form && !visible) {
        form.resetFields();
      }
    };
  }, []);

  return (
    <Modal
      confirmLoading={loading}
      visible={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
      forceRender
      title="重置密码"
    >
      <Form name="resetPassword" form={form} onFinish={handleFormFinish} {...layout}>
        <Form.Item name="password" label="新密码">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResetPwdModal;
