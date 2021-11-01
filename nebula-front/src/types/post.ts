import type { MediaType } from '@nebula/design';
import type { PostCategoryType } from '@/types/postCategory';

export interface PostType {
  id: any;
  siteId?: any; // 站点Id
  categoryId: any; // 分类ID
  sort: number; // 排序
  isSticky: boolean; // 是否置顶
  cover?: string; // 封面
  title: string; // 名称
  description?: string; // 描述
  link?: string; // 链接
  externalLink?: string; // 外链
  content?: string;
  extraContent: Record<string, any>; // 额外内容
  gallery?: MediaType[]; // 图集|视频集
  attachment?: MediaType[]; // 附件
  template: string; // 显示模板
  status: 'pending' | 'enable' | 'disable'; // 状态
  pageViews: number; // 页面点击量
  author?: string; // 作者
  editor?: string; // 编辑
  referenceLink?: string; // 引用地址
  publishedAt: string; // 发布时间
  createdAt: string; // 创建时间
  updatedAt: string; // 更新时间
  category: PostCategoryType;
  tags: string[];
}
