import React from 'react';
import { useModel, history } from 'umi';
import { Avatar, Menu, Space } from 'antd';

const MyMenu: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const handleClick = (pathname: string) => {
    history.push(pathname);
  };

  return (
    <div>
      <Space>
        <Avatar src={initialState?.currentUser?.avatar} shape="circle" size={48} />
        <span>{initialState?.currentUser?.nickname}</span>
      </Space>

      <Menu
        mode="inline"
        onClick={(e) => handleClick(e.key)}
        selectedKeys={[history.location.pathname]}
      >
        <Menu.Item key="/my/home">我的首页</Menu.Item>
        <Menu.Item key="/my/profile">个人资料</Menu.Item>
        <Menu.Item key="/my/account">账户安全</Menu.Item>
        <Menu.Item key="/my/favorites">我的收藏</Menu.Item>
      </Menu>
    </div>
  );
};

export default MyMenu;
