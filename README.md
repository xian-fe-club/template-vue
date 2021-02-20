# vue3.0_project_demo

## 技术选型 - 单页应用

打包构建 - VUE-cli
工程化内容 - Eslint + Prettier + TypeScript + Axios
UI 库 - AntD
组件化 - Vue.next
路由管理 - Vue-Router
全局状态管理 - Vuex
样式预编译 - Less
GIT 钩子 - Husky + Lint-staged + VcmCli

## 项目依赖安装

```
npm install
```

### 开发与构建

```
开发环境代码运行
npm run serve

测试环境代码运行
npm run serve:test

生产环境代码运行
npm run serve:debug
```

### 打包

```
开发环境代码打包
npm run build

测试环境代码打包
npm run build:debug

生产环境代码打包
npm run build:prod
```

### Run your unit tests

```
npm run test:unit
```

### 修复部分代码

```
npm run lint
```

### 上传 -- 目前由 Jenkins 发布

```
上传 oss 至开发环境目录
npm run deploy

上传 oss 至测试环境目录
npm run deploy:debug

上传 oss 至生产环境目录
npm run deploy:prod

上传Jenkinsfile由运维维护
```

### VSCode 配置

```
- 由于 VSCode 的 eslint校验, 我们需要加入以下设置防止 VSCode 的 eslint 报错，部分后续可继续扩展和更改
  "eslint.options": {
    "rules": {
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-var-requires': 0,
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-expressions': 0,
      'no-unused-vars': 0
    }
  }

- 为了统一注释格式插件 请使用 fileheader 插件, 在根目录下新建.vscode 文件夹,创建 setting.json,根据当前项目,当前版本号创建对应参数

  {
    "fileheader.cursorMode": {
    "author": "",
    "description": "",
    "param": "",
    "return": "",
    "version": ""
    }
  }

```
