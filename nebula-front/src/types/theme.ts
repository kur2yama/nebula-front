import type { ComponentType, Component, ReactNode } from 'react';

export interface TemplateType {
  value: string;
  label: string;
  component: ComponentType | Component | ReactNode;
}

export interface ThemeType {
  label: string;
  value: string;
  templates: {
    layouts: TemplateType[]; // 布局相关的主题
    pages: TemplateType[]; // 页面相关的主题
    post: TemplateType[]; // 文章相关的主题
    postCategory: TemplateType[]; // 文章分类相关的主题
    [k: string]: TemplateType[]; // 其他相关的主题
  };
}
