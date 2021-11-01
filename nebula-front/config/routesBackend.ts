export default [
  {
    path: '/backend',
    name: '管理平台',
    layout: false,
    component: '@/layouts/BackendLayout',
    routes: [
      { path: '/backend', redirect: '/backend/dashboard' },
      {
        path: '/backend/dashboard',
        name: '控制台',
        icon: 'dashboard',
        access: 'onlyBackend',
        routes: [
          { path: '/backend/dashboard', redirect: '/backend/dashboard/welcome' },
          { path: '/backend/dashboard/welcome', name: '欢迎', component: './dashboard/welcome' },
          { component: './exception/404' },
        ],
      },
      {
        name: '内容管理',
        path: '/backend/content',
        icon: 'global',
        access: 'onlyBackend',
        routes: [
          {
            path: '/backend/content/post',
            name: '文章',
            hideChildrenInMenu: true,
            routes: [
              { path: '/backend/content/post', redirect: '/backend/content/post/list' },
              {
                path: '/backend/content/post/list',
                name: '全部文章',
                component: '@/pages/content/post',
              },
              {
                path: '/backend/content/post/create',
                name: '新建文章',
                component: '@/pages/content/post/PostEditor',
              },
              {
                path: '/backend/content/post/update',
                name: '编辑文章',
                component: '@/pages/content/post/PostEditor',
              },
            ],
          },
          {
            path: '/backend/content/category',
            name: '文章分类',
            component: '@/pages/content/postCategory',
          },
          {
            path: '/backend/content/contentList',
            name: '内容列表',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/backend/content/contentList',
                redirect: '/backend/content/contentList/list',
              },
              {
                path: '/backend/content/contentList/list',
                name: '全部内容列表',
                component: '@/pages/content/contentList',
              },
              {
                path: '/backend/content/contentList/update',
                name: '编辑内容列表',
                component: '@/pages/content/contentList/ConfigEditor',
              },
            ],
          },
        ],
      },
      {
        path: '/backend/system',
        name: '系统设置',
        icon: 'setting',
        access: 'onlyAdmin',
        routes: [
          {
            path: '/backend/system/site',
            name: '站点管理',
            component: './system/site',
          },
          {
            path: '/backend/system/acl',
            name: 'API访问控制',
            component: './system/accessControlList',
          },
          {
            path: '/backend/system/user',
            name: '用户管理',
            component: './system/user',
          },
          {
            path: '/backend/system/role',
            name: '角色管理',
            component: './system/role',
          },
          {
            path: '/backend/system/group',
            name: '用户组管理',
            component: './system/group',
          },
          {
            path: '/backend/system/media',
            name: '媒体资源',
            component: './system/media',
          },
          {
            path: '/backend/system/area',
            name: '行政区域',
            component: './system/area',
          },
          { component: './exception/404' },
        ],
      },
      {
        name: '我的',
        path: '/backend/my',
        icon: 'user',
        access: 'onlyBackend',
        routes: [
          { path: '/backend/my', redirect: '/backend/my/account' },
          {
            name: '个人设置',
            path: '/backend/my/account',
            component: '@/pages/my/account',
          },
        ],
      },
      { component: './exception/404' },
    ],
  },
];
