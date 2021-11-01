// https://umijs.org/config/
import { defineConfig } from 'umi';
// import { join } from 'path';
import moment from 'moment';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
// @ts-ignore
import PACKAGE from '../package.json';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  // extraBabelPlugins: [
  //   ['import', { libraryName: 'antd-mobile-v5', libraryDirectory: 'es/components', style: true }],
  // ],
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },

  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      schemaPath: `http://localhost:8908/docs/api-docs.json`,
      // schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    // {
    //   requestLibPath: "import { request } from 'umi'",
    //   schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
    //   projectName: 'swagger',
    // },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    APP_BUILD_DATE: moment().format('YYYYMMDD'),
    APP_VERSION: PACKAGE.version,
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
