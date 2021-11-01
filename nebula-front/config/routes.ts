import routesFrontend from './routesFrontend';
import routesBackend from './routesBackend';
import routesMy from './routesMy';

export default [
  {
    path: '/exception',
    layout: false,
    routes: [
      { path: '/exception/timeout', component: './exception/Timeout' },
      { path: '/exception/403', component: './exception/403' },
      { path: '/exception/404', component: './exception/404' },
    ],
  },
  {
    path: '/auth',
    layout: false,
    component: '../layouts/AuthLayout',
    routes: [
      { path: '/auth', redirect: '/auth/login' },
      { name: '登录', path: '/auth/login', component: '@/themes/ThemePage' },
      { name: '注册', path: '/auth/register', component: '@/themes/ThemePage' },
      { name: '找回密码', path: '/auth/password', component: '@/themes/ThemePage' },
      { component: './exception/404' },
    ],
  },
  {
    path: '/oauth',
    layout: false,
    routes: [{ name: '第三方登录', path: '/oauth/login', component: '../components/OauthLogin' }],
  },
  ...routesMy,
  ...routesBackend,
  ...routesFrontend,

  { component: './exception/404' },
];
