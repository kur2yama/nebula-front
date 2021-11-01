import type { MediaFileType } from '@nebula/design';

export interface SiteConfigLinkType {
  link: string;
  label: string;
}

export interface SiteConfigMediaType {
  /** 文件类型 */
  fileType: MediaFileType;
  /** 文件大小 */
  maxSize: string;
}

export interface SiteConfigType {
  /** 详细配置 */
  profile: {
    /** 口号 */
    slogan: string;
    /** 版权 */
    copyright: string;
    /** icp备案 */
    icp: string;
    /** 公安备案 */
    policeIcp: string;
    /** meta关键字 */
    metaKeyword: string;
    /** meta描述 */
    metaDescription: string;
    /** 友情链接或其他 */
    links: SiteConfigLinkType[];
    /** 主题 */
    theme: string;
    /** 上传配置 */
    media: SiteConfigMediaType[];
  };
  /** 认证相关配置 */
  auth: {
    /** 登录模式 */
    loginType: 'account' | 'email' | 'mobile' | 'username';
    /** 允许的第三方登录 */
    allowedOauth: string[];
    /** 注册模式 */
    registerType: 'email' | 'mobile' | 'username';
    /** 是否允许注册 */
    allowRegister: boolean;
    /** 是否允许找回密码 */
    allowFindPassword: boolean;
    /** 启用注册验证码 */
    enableRegisterCaptcha: boolean;
    /** 注册默认角色 */
    defaultRoles: string[];
    /** 注册默认分组 */
    defaultGroups: string[];
  };
  /** 第三方登录配置 */
  oauth: {
    cjyAppId: string;
    cjySiteId: string;
    cjyAppSecret: string;
  };
  /** 文章设置 */
  post: {
    /** 文章图集最大数量 */
    maxGallery: number;
    /** 文章最大附件数量 */
    maxAttachment: number;
  };
}

export interface SiteType {
  /** ID */
  id: any;
  /** 站点代码 */
  code: string;
  /** 站点名称 */
  name: string;
  /** 站点LOGO */
  logo: string;
  /** 站点描述 */
  description: string;
  /** 站点配置 */
  config: SiteConfigType;
  /** 站点状态 */
  status: 'enable' | 'disable';
}
