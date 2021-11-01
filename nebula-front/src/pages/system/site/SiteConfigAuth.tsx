import React, { useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, Divider, Form, Radio, Select, Switch, TreeSelect } from 'antd';
import { BACKEND, SITE } from '@/dictionary';
import type { SiteConfigType } from '@/types/site';
import type { RoleType } from '@/types/role';
import type { GroupType } from '@/types/group';

const { SHOW_PARENT } = TreeSelect;

interface SiteConfigAuthProps {
  data?: SiteConfigType;
  onSave: (values: any) => void;
  loading?: boolean;
  roles?: RoleType[];
  groups?: GroupType[];
}

const SiteConfigAuth: React.FC<SiteConfigAuthProps> = (props) => {
  const { data, onSave, loading, roles, groups = [] } = props;
  const [form] = Form.useForm();
  const [allowRegister, setAllowRegister] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      setAllowRegister(data.auth.allowRegister || false);
    }
  }, [data]);

  const handleSave = (values: any) => {
    onSave({
      config: {
        ...data,
        ...values,
      },
    });
  };

  const roleOptions = useMemo(() => {
    if (roles) {
      return roles.map((role) => ({
        label: role.displayName,
        value: `${role.id}`,
      }));
    }

    return [];
  }, [roles]);

  return (
    <Form {...BACKEND.layout} form={form} onFinish={handleSave} scrollToFirstError>
      <Form.Item label="登录类型" name={['auth', 'loginType']}>
        <Radio.Group options={SITE.loginType} />
      </Form.Item>
      <Form.Item label="允许的第三方登录" name={['auth', 'allowedOauth']}>
        <Checkbox.Group options={SITE.allowedOauth} />
      </Form.Item>
      <Form.Item label="允许找回密码" name={['auth', 'allowFindPassword']} valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="允许注册" name={['auth', 'allowRegister']} valuePropName="checked">
        <Switch onChange={setAllowRegister} />
      </Form.Item>
      <Form.Item label="默认用户角色" name={['auth', 'defaultRoles']}>
        <Select mode="multiple" options={roleOptions} />
      </Form.Item>
      <Form.Item label="默认用户组" name={['auth', 'defaultGroups']}>
        <TreeSelect showCheckedStrategy={SHOW_PARENT} treeCheckable treeData={groups || []} />
      </Form.Item>
      {allowRegister && (
        <>
          <Form.Item label="注册类型" name={['auth', 'registerType']}>
            <Radio.Group options={SITE.registerType} />
          </Form.Item>
          <Form.Item
            label="启用注册验证码"
            name={['auth', 'enableRegisterCaptcha']}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </>
      )}

      <Divider />
      <Form.Item {...BACKEND.tailLayout}>
        <Button type="primary" htmlType="submit" size="large" loading={loading}>
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SiteConfigAuth;
