/**
 * 这个文件存放需要用到的各种字典和枚举值
 * 因为都是常量，所以输出的变量名称需 大写
 * 键值需要驼峰
 */
import { DEFAULT_AVATAR } from '@/constants';

export const BACKEND = {
  layout: {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  },
  tailLayout: {
    wrapperCol: { offset: 4, span: 12 },
  },
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
};

export const SITE = {
  defaultValue: {},
  loginType: [
    { label: '用户名/Email/手机号', value: 'account' },
    { label: '用户名', value: 'username' },
    { label: '邮箱', value: 'email' },
    { label: '手机号', value: 'mobile' },
  ],
  allowedOauth: [
    { label: '长江云', value: 'cjy' },
    { label: '微信', value: 'wechat' },
  ],
  registerType: [
    { label: '邮箱', value: 'email' },
    { label: '手机号', value: 'mobile' },
    { label: '用户名', value: 'username' },
  ],
};

export const MEDIA = {
  fileType: [
    { value: 'image', label: '图片' },
    { value: 'file', label: '文件' },
    { value: 'document', label: '文档' },
    { value: 'video', label: '视频' },
    { value: 'audio', label: '音频' },
  ],
};

export const AUTH = {
  account: {
    rules: [{ required: true, message: '请填写用户名或Email或手机号' }],
    placeholder: '用户名/Email/手机号',
  },
  username: {
    rules: [
      { required: true, message: '请填写用户名' },
      { type: 'string', min: 3, max: 32, message: '用户名需3-32个字符' },
    ],
    placeholder: '用户名',
  },
  email: {
    rules: [{ required: true, type: 'email', message: '请填写Email' }],
    placeholder: '电子邮箱',
  },
  mobile: {
    rules: [{ required: true, pattern: /^1[3456789]\d{9}$/, message: '请填写正确的手机号' }],
    placeholder: '手机号',
  },
  oldPassword: {
    rules: [{ required: true, message: '请填写密码' }],
    placeholder: '现在的密码',
  },
  password: {
    rules: [
      { required: true, message: '请填写密码' },
      { min: 6, max: 16, message: '密码必须6-16个字符' },
    ],
    placeholder: '你设置的密码',
  },
  captcha: {
    rules: [{ required: true, message: '请填写验证码' }],
    placeholder: '验证码',
  },
};

export const USER = {
  defaultValue: {
    username: '新用户',
    email: '',
    avatar: DEFAULT_AVATAR,
    status: 'enable',
    roles: ['2'],
    groups: ['1'],
  },
  status: [
    { label: '启用', value: 'enable' },
    { label: '禁用', value: 'disable' },
  ],
};

export const ACL = {
  method: [
    { label: 'GET', value: 'GET', color: '#1890ff' },
    { label: 'POST', value: 'POST', color: '#f5222d' },
    { label: 'PUT', value: 'PUT', color: '#fa8c16' },
    { label: 'DELETE', value: 'DELETE', color: '#08979c' },
    { label: 'PATCH', value: 'PATCH', color: '#eb2f96' },
  ],
};

export const POST_CATEGORY = {
  defaultValue: {
    sort: 999,
    template: 'defaultCategory',
  },
};

export const POST = {
  defaultValue: {
    sort: 999,
    template: 'default',
    isSticky: false,
    status: 'enable',
  },
  status: [
    { label: '待审核', value: 'pending', color: '' },
    { label: '禁用', value: 'disable', color: '#262626' },
    { label: '启用', value: 'enable', color: '#2db7f5' },
  ],
  sticky: [
    { label: '置顶', value: 'yes' },
    { label: '不置顶', value: 'no' },
  ],
};

export const CONTENT_LIST = {
  defaultValue: {
    ttl: 0,
  },
  configDefaultValue: {
    postsLength: 0,
    postsOrderBy: 'DESC',
  },
  orderBy: [
    { label: '正序', value: 'ASC' },
    { label: '倒序', value: 'DESC' },
  ],
  contentType: [
    {
      label: '文章',
      value: 'post',
    },
    {
      label: '分类',
      value: 'category',
    },
    {
      label: '自定义',
      value: 'custom',
    },
    {
      label: '内容列表',
      value: 'contentList',
    },
  ],
};
