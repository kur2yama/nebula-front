// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  base: '/app/nebula-cms-test/',
  publicPath: '/app/nebula-cms-test/', // 指定 webpack 的 publicPath，指向静态资源文件所在的路径。
  hash: true, // 是否开启 hash 文件后缀。
});
