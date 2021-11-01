export default [
  {
    path: '/',
    layout: false,
    component: '../layouts/PublicLayout',
    routes: [
      { path: '/', redirect: '/home' },
      { path: '/home', name: '首页', component: '@/themes/ThemePage' },
      { path: '/post', name: '文章', component: '@/themes/ThemePost' },
      { path: '/category', name: '文章列表', component: '@/themes/ThemePostCategory' },
      { component: './exception/404' },
    ],
  },
];
