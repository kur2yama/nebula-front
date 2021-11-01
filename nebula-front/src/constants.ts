const envConfig = {
  local: {
    api: 'http://localhost:8908',
    // api: 'https://p2.hbtv.com.cn/api/cms-preview',
    root: 'http://localhost:8000',
    code: 'nebula-cms-local',
    publicPath: '',
    captchaCoolDown: 10,
  },
  test: {
    api: 'https://p2.hbtv.com.cn/api/app-name-test',
    root: 'https://p2.hbtv.com.cn/app/app-name-test',
    code: 'nebula-cms-test',
    publicPath: '/app/app-name-test',
    captchaCoolDown: 60,
  },
  prod: {
    api: 'https://p2.hbtv.com.cn/api/app-name',
    root: 'https://p2.hbtv.com.cn/app/app-name',
    code: 'nebula-cms',
    publicPath: '/app/app-name',
    captchaCoolDown: 60,
  },
};

export const PROJECT = {
  name: 'Nebula CMS',
  code: envConfig[REACT_APP_ENV || 'local'].code,
  slogan: '用标准手法粘贴，复制，再发布',
  copyright: '湖北长江云新媒体集团',
  address: '湖北省武汉市武昌区公正路湖北电视大楼',
  captchaCoolDown: envConfig[REACT_APP_ENV || 'local'].captchaCoolDown,
};

export const URI = envConfig[REACT_APP_ENV || 'local'];
export const DEFAULT_AVATAR = '//static.hbtv.com.cn/dev/avatar-default.jpg';
export const DEFAULT_LOGO = 'https://static.hbtv.com.cn/nebula/logo.png';
