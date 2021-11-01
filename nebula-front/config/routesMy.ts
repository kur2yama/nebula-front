export default [
  {
    path: '/my',
    layout: false,
    component: '../layouts/MyLayout',
    routes: [
      { path: '/my', redirect: '/my/home' },
      { path: '/my/home', name: '我的首页', component: '@/themes/ThemePage' },
      { path: '/my/profile', name: '个人资料', component: '@/themes/ThemePage' },
      { path: '/my/account', name: '账户安全', component: '@/themes/ThemePage' },
      { path: '/my/favorites', name: '我的收藏', component: '@/themes/ThemePage' },
      { component: './exception/404' },
    ],
  },
];
