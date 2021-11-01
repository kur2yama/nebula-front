import type { ThemeType } from '@/types/theme';
import type { SiteConfigType } from '@/types/site';
import defaultTheme from '@/themes/default/config';
import mobileTheme from '@/themes/mobile/config';

export const THEMES: ThemeType[] = [defaultTheme, mobileTheme];

const getCurrentThemeByName = (theme = 'default') => {
  const foundTheme = THEMES.find((item) => item.value === theme);
  return foundTheme || defaultTheme;
};

export const getCurrentThemeBySiteConfig = (siteConfig?: SiteConfigType) => {
  const theme = !siteConfig || !siteConfig.profile.theme ? 'default' : siteConfig.profile.theme;
  return getCurrentThemeByName(theme);
};

const getCategoryThemeComponent = (themeConfig: ThemeType, category: string, pageName: string) => {
  // 取对应分类
  const pages = themeConfig.templates[category] || themeConfig.templates.pages;
  // 取对应的页面
  const foundPage = pages.find((item) => item.value === pageName);
  // 返回对应的组件
  return foundPage ? foundPage.component : themeConfig.templates.pages[0].component;
};

export const getLayoutThemeComponent = (siteConfig: SiteConfigType, pageName = 'blank') => {
  // 获取当前主题
  const themeConfig = getCurrentThemeBySiteConfig(siteConfig);
  // 返回对应的组件
  return getCategoryThemeComponent(themeConfig, 'layouts', pageName);
};

export const getPageThemeComponent = (siteConfig: SiteConfigType, pageName = 'blank') => {
  // 获取当前主题
  const themeConfig = getCurrentThemeBySiteConfig(siteConfig);
  // 返回对应的组件
  return getCategoryThemeComponent(themeConfig, 'pages', pageName);
};

export const getLayoutConfigByTheme = (siteConfig: SiteConfigType, layoutName = 'blank') => {
  // 获取当前主题
  const themeConfig = getCurrentThemeBySiteConfig(siteConfig);

  // 取对应分类
  const { layouts } = themeConfig.templates;
  // 取对应的页面
  return layouts.find((item) => item.value === layoutName);
};

export const getPageConfigByTheme = (siteConfig: SiteConfigType, pageName = 'blank') => {
  // 获取当前主题
  const themeConfig = getCurrentThemeBySiteConfig(siteConfig);

  // 取对应分类
  const { pages } = themeConfig.templates;
  // 取对应的页面
  return pages.find((item) => item.value === pageName);
};

export const getPostThemeConfig = (siteConfig: SiteConfigType, postTheme: string) => {
  const themeConfig = getCurrentThemeBySiteConfig(siteConfig);

  const postThemeConfig = themeConfig.templates.post.find((item) => item.value === postTheme);

  return postThemeConfig || defaultTheme.templates.post.find((item) => item.value === 'default');
};

export const getPostCategoryThemeConfig = (siteConfig: SiteConfigType, postTheme: string) => {
  const themeConfig = getCurrentThemeBySiteConfig(siteConfig);

  const postCategoryThemeConfig = themeConfig.templates.postCategory.find(
    (item) => item.value === postTheme,
  );

  return (
    postCategoryThemeConfig ||
    defaultTheme.templates.postCategory.find((item) => item.value === 'defaultCategory')
  );
};
