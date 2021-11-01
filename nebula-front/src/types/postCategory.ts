import type { ProFormColumn } from '@nebula/pro-form';

export interface PostCategoryType {
  id: any;
  parentId: any;
  siteId: any;
  sort: number;
  name: string;
  label: string;
  title: string;
  value: string;
  cover: string;
  description: string;
  link: string;
  externalLink: string;
  extraFields: ProFormColumn[];
  template: string;
  children: PostCategoryType[];
}
