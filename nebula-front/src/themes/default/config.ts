import type { ThemeType } from '@/types/theme';
import { lazy } from 'react';

const config: ThemeType = {
  label: '默认主题',
  value: 'default',
  templates: {
    layouts: [
      {
        value: 'public',
        label: '公共页面布局',
        component: lazy(() => import('@/themes/default/layouts/PublicLayout')),
      },
      {
        value: 'auth',
        label: '验证页面布局',
        component: lazy(() => import('@/themes/default/layouts/AuthLayout')),
      },
      {
        value: 'my',
        label: '用户中心布局',
        component: lazy(() => import('@/themes/default/layouts/MyLayout')),
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
        component: lazy(() => import('@/themes/default/pages/home')),
      },
      {
        value: '/auth/login',
        label: '登录页',
        component: lazy(() => import('@/themes/default/pages/auth/Login')),
      },
      {
        value: '/auth/register',
        label: '注册页',
        component: lazy(() => import('@/themes/default/pages/auth/Register')),
      },
      {
        value: '/auth/password',
        label: '注册页',
        component: lazy(() => import('@/themes/default/pages/auth/FindPassword')),
      },
      {
        value: '/my/home',
        label: '我的首页',
        component: lazy(() => import('@/themes/default/pages/my/home')),
      },
      {
        value: '/my/profile',
        label: '个人资料',
        component: lazy(() => import('@/themes/default/pages/my/profile')),
      },
      {
        value: '/my/account',
        label: '账户安全',
        component: lazy(() => import('@/themes/default/pages/my/account')),
      },
      {
        value: '/my/favorites',
        label: '我的收藏',
        component: lazy(() => import('@/themes/default/pages/my/favorites')),
      },
    ],
    post: [
      {
        value: 'default',
        label: '默认文章页',
        component: lazy(() => import('@/themes/default/pages/post')),
      },
    ],
    postCategory: [
      {
        value: 'defaultCategory',
        label: '默认分类页',
        component: lazy(() => import('@/themes/default/pages/post/category')),
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
