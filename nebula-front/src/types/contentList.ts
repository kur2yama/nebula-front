import type { PostType } from '@/types/post';
import type { PostCategoryType } from '@/types/postCategory';

export type ContentType = 'post' | 'category' | 'custom' | 'contentList';
export interface ContentListType {
  id: any; // ID
  title: string; // 内容列表名称
  displayLabel: string; // 显示名称
  description?: string; // 描述
  cover?: string; // 封面
  ttl: number; // 缓存时间 单位分钟
  link: string; // 内链
  externalLink: string; // 外链
  content: ContentConfigType[]; // 内容
}

export type ContentListCreateType = Omit<ContentListType, 'id' | 'content'>;

export interface ContentConfigType {
  key: string;
  // 类型
  contentType: ContentType;

  // 公共属性
  title: string; // 园区咨询
  description?: string; // 描述
  cover?: string; // 该item的 cover 如果未设置 且是 category 或 post 则用对应的 cover，如果设置了则覆盖
  link?: string; // 内接
  externalLink?: string; // 外链

  // post 需要的属性
  postId?: any;

  // category 需要的属性
  categoryId?: any; // 分类ID
  postsLength?: number; // 是否同时获取对应分类下的文章数量 0 表示不获取
  postsOrderBy?: 'ASC' | 'DESC'; // 是否同时获取对应分类下的文章的排序，getCategoryPostsLength > 0 时生效

  // content 需要的属性
  contentListId?: any;
  contentListLevel?: number; // 默认1 , 嵌套读取的层数
}

export interface ResponseData {
  config: ContentConfigType;
  data: PostType | PostCategoryType;
}

export interface ResponseType {
  code: number;
  message: string;
  data: ResponseData[];
}
