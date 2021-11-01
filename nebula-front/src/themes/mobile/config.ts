import type { ThemeType } from '@/types/theme';
import { lazy } from 'react';

const config: ThemeType = {
  label: '手机端主题',
  value: 'mobile',
  templates: {
    layouts: [
      {
        value: 'public',
        label: '手机端公共页面布局',
        component: lazy(() => import('@/themes/mobile/layouts/PublicLayout')),
      },
      {
        value: 'auth',
        label: '验证页面布局',
        component: lazy(() => import('@/themes/mobile/layouts/AuthLayout')),
      },
      {
        value: 'my',
        label: '我的布局',
        component: lazy(() => import('@/themes/mobile/layouts/MyLayout')),
      },
    ],
    pages: [
      // {
      //   value: 'blank',
      //   label: '空白页',
      //   component: lazy(() => import('@/themes/default/pages/blank')),
      // },
      {
        value: '/home',
        label: '首页',
        component: lazy(() => import('@/themes/mobile/pages/home')),
      },
      {
        value: '/auth/login',
        label: '登录页',
        component: lazy(() => import('@/themes/mobile/pages/auth/Login')),
      },
      {
        value: '/auth/register',
        label: '注册页',
        component: lazy(() => import('@/themes/mobile/pages/auth/Register')),
      },
      {
        value: '/auth/password',
        label: '注册页',
        component: lazy(() => import('@/themes/mobile/pages/auth/FindPassword')),
      },
      {
        value: '/my/home',
        label: '我的首页',
        component: lazy(() => import('@/themes/mobile/pages/my/home')),
      },
      // {
      //   value: '/my/profile',
      //   label: '个人资料',
      //   component: lazy(() => import('@/themes/mobile/pages/my/profile')),
      // },
      // {
      //   value: '/my/account',
      //   label: '账户安全',
      //   component: lazy(() => import('@/themes/mobile/pages/my/account')),
      // },
      // {
      //   value: '/my/favorites',
      //   label: '我的收藏',
      //   component: lazy(() => import('@/themes/mobile/pages/my/favorites')),
      // },
    ],
    post: [
      {
        value: 'default',
        label: '默认文章页',
        component: lazy(() => import('@/themes/mobile/pages/post')),
      },
    ],
    postCategory: [
      {
        value: 'defaultCategory',
        label: '默认分类页',
        component: lazy(() => import('@/themes/mobile/pages/post/category')),
      },
      // {
      //   value: 'defaultTopic',
      //   label: '默认专题页',
      //   component: lazy(() => import('@/themes/default/topic/default')),
      // },
    ],
  },
};

export default config;
