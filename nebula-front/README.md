# Nebula Front

- 基于 ant-design-pro v5， umi 3.x
- nebula-components
- 使用`typescript`
- 遵循`eslint`, `stylelint`规范（详见配置文件）
- 使用`prettier` 作为代码格式化工具
- 使用`yarn`管理包
- 使用`git`进行版本管理
- 使用`git hook`在提交时进行代码检查
- 遵守`AngularJS` 提交规范
- 使用`OpenAPI`从`swagger`生成声明文件和服务(详见 antd-prod 的说明)

## 开发

- 开发前先熟悉`ant-design-pro v5`和`umi 3.x`
- 接口规范请查看后端说明文档
- 开发前请先配置 `./config/config.环境.ts` 和 `./src/contents.ts`两个文件

### 安装

```shell
$ git clone 项目地址 项目名称 # 下载项目
$ cd 项目名称
$ yarn add nrm -g # 全局安装 nrm
$ nrm add hbtv https://registry.cloud.hbtv.com.cn/manage/repository/npm-group/ # 添加私有源
$ nrm use hbtv # 使用私有源
$ yarn install # 安装依赖包
```

### 启动和打包

```shell
$ yarn start # 启动项目
$ yarn build:环境 # 打包项目 环境包含 local | test | prod
```


