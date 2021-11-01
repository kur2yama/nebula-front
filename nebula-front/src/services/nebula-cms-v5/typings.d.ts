// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ApiResponse = {
    /** 返回状态码 */
    code?: number;
    /** 返回消息 */
    message?: string;
  };

  type ApiType = {
    /** ID */
    id?: number;
    /** 请求方式 */
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    /** URI */
    uri: string;
    /** 描述 */
    description?: string;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  };

  type AreaType = {
    /** ID */
    id?: number;
    /** 上级ID */
    parentId: number;
    /** 区域名称 */
    name: string;
    /** 显示名 */
    displayName: string;
    /** 描述 */
    description?: string;
    /** 下级 */
    children?: AreaType[];
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  };

  type ContentListType = {
    /** ID */
    id?: number;
    /** 内容列表名称 */
    title: string;
    /** 显示名 */
    displayLabel?: string;
    /** 描述 */
    description?: string;
    /** 封面 */
    cover?: string;
    /** 缓存时间 */
    ttl?: number;
    /** 内链 */
    link?: string;
    /** 外链 */
    externalLink?: string;
    /** 内容 */
    content: ContentListContentConfig[];
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  };

  type ContentListContentConfig = {
    /** ID */
    key?: number;
    contentType?: ContentListContentType;
    /** 内容列表名称 */
    title?: string;
    /** 描述 */
    description?: string;
    /** 封面 */
    cover?: string;
    /** 内链 */
    link?: string;
    /** 外链 */
    externalLink?: string;
    /** 文章ID */
    postId?: number;
    /** 分类ID */
    categoryId?: number;
    /** 取文章数量 */
    postsLength?: number;
    /** 文章的排序 */
    postsOrderBy?: 'ASC' | 'DESC';
    /** 内容列表ID */
    contentListId?: number;
    /** 读取的层级 */
    contentListLevel?: number;
  };

  type ContentListContentType = 'post' | 'category' | 'custom' | 'contentList';

  type GroupType = {
    /** ID */
    id?: number;
    /** 上级ID */
    parentId: number;
    /** 分组名 */
    name: string;
    /** 显示名 */
    displayName: string;
    /** 描述 */
    description?: string;
    /** 下级 */
    children?: GroupType[];
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  };

  type MediaType = {
    /** ID */
    id?: number;
    /** 站点id */
    siteId?: number;
    /** 用户id */
    userId?: number;
    /** 描述 */
    description?: string;
    /** 保存的disk */
    disk?: string;
    /** mimeType */
    mimeType?: string;
    /** 文件名 */
    fileName?: string;
    fileType?: MediaFileType;
    /** 文件大小, 单位byte */
    fileSize?: string;
    /** 站点描述, 如300*300 */
    rectSize?: string;
    /** 站点描述, 单位秒 */
    duration?: string;
    /** 存储链接 */
    savePath?: string;
    /** 访问链接 */
    url?: string;
    /** 预览链接 */
    preview?: string;
    /** 状态 */
    status?: 'pending' | 'transcoding' | 'enable' | 'disable';
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  };

  type MediaFileType = 'image' | 'file' | 'document' | 'video' | 'audio';

  type PostType = {
    /** ID */
    id?: number;
    /** 站点ID */
    siteId?: number;
    /** 分类ID */
    categoryId?: number;
    /** 排序 */
    sort?: number;
    /** 是否置顶 */
    isSticky?: 'yes' | 'no';
    /** 封面 */
    cover?: string;
    /** 标题 */
    title?: string;
    /** 描述 */
    description?: string;
    /** 内链 */
    link?: string;
    /** 外链 */
    externalLink?: string;
    /** 内容 */
    content?: string;
    /** 额外内容 */
    extraContent?: string;
    /** 图集 */
    gallery?: MediaType[];
    /** 附件 */
    attachment?: MediaType[];
    /** 模板 */
    template?: string;
    /** 状态 */
    status?: 'pending' | 'disable' | 'enable';
    /** 浏览量 */
    pageViews?: number;
    /** 作者 */
    author?: string;
    /** 编辑 */
    editor?: string;
    /** 引用链接 */
    referenceLink?: string;
    /** 发布时间 */
    publishedAt?: string;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  };

  type PostCategoryType = {
    /** ID */
    id?: number;
    /** 上级ID */
    parentId: number;
    /** 站点ID */
    siteId?: number;
    /** 站点ID */
    sort?: number;
    /** 分类名 */
    name: string;
    /** 显示名 */
    label?: string;
    /** 显示名 */
    title?: string;
    /** ID */
    value?: string;
    /** 封面 */
    cover?: string;
    /** 描述 */
    description?: string;
    /** 内链 */
    link?: string;
    /** 外链 */
    externalLink?: string;
    /** 额外字段 */
    extraFields?: PostCategoryExtraFields[];
    /** 外链 */
    template?: string;
    /** 下级 */
    children?: PostCategoryType[];
  };

  type PostCategoryExtraFields = {
    /** ID */
    dataIndex?: string;
    /** 上级ID */
    title?: number;
    /** 站点ID */
    valueType?: number;
  };

  type RoleType = {
    /** ID */
    id?: number;
    /** 角色名 */
    name: string;
    /** 显示名 */
    displayName: string;
    /** 描述 */
    description?: string;
    /** 等级 */
    rank: number;
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  };

  type SiteType = {
    /** 站点ID */
    id?: number;
    /** 站点code */
    code?: string;
    /** 站点图标 */
    icon?: string;
    /** 站点描述 */
    description?: number;
    config?: SiteConfigType;
    /** 站点状态 */
    status?: string;
  };

  type SiteConfigType = {
    /** 站点ICP */
    icp?: string;
    auth?: SiteConfigAuthType;
    post?: SiteConfigPostType;
    /** 站点主题 */
    theme?: string;
    /** 站点关键字 */
    keyword?: string;
    provider?: SiteConfigProviderType;
    /** 版权信息 */
    copyright?: string;
    /** 公安备案信息 */
    policeIcp?: string;
    /** 站点描述 */
    description?: string;
  };

  type SiteConfigAuthType = {
    /** 登录方式 */
    loginType?: 'username' | 'email' | 'mobile' | 'account';
    /** 允许的第三方认证方式 */
    allowedOauth?: 'cjy' | 'wechat'[];
    /** 默认角色 */
    defaultRoles?: string[];
    /** 注册类型 */
    registerType?: number;
    /** 允许注册 */
    allowRegister?: boolean;
    /** 默认用户组 */
    defaultGroups?: string[];
    /** 允许找回密码 */
    allowFindPassword?: boolean;
    /** 注册需要验证码 */
    enableRegisterCaptcha?: boolean;
  };

  type SiteConfigPostType = {
    /** 图片集最大数量 */
    maxGallery?: number;
    /** 附件最大数量 */
    maxAttachment?: number;
  };

  type SiteConfigProviderType = {
    /** 长江云AppId */
    cjyAppId?: string;
    /** 长江云SiteId */
    cjySiteId?: string;
    /** 长江云AppSecret */
    cjyAppSecret?: string;
  };

  type UserType = {
    /** ID */
    id?: number;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 密码 */
    password: string;
    /** 头像 */
    avatar?: string;
    /** 邮箱 */
    email?: string;
    /** 邮件是否验证 */
    emailVerified?: boolean;
    /** 手机号 */
    mobile?: string;
    /** 状态 */
    status: 'enable' | 'disable';
    /** 创建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
  };

  type WechatJSSdkConfigType = {
    /** 开启调试模式 */
    debug?: boolean;
    /** 公众号的唯一标识 */
    appId: string;
    /** 生成签名的随机串 */
    nonceStr: string;
    /** 生成签名的时间戳 */
    timestamp: number;
    /** 需要签名的url */
    url: string;
    /** 签名 */
    signature: string;
    /** 签名 */
    jsApiList?:
      | 'updateAppMessageShareData'
      | 'updateTimelineShareData'
      | 'onMenuShareWeibo'
      | 'onMenuShareQZone'[];
    /** 签名 */
    openTagList?: 'wx-open-launch-weapp' | 'wx-open-launch-app'[];
  };
}
