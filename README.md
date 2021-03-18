# vue3.0_project_demo

## 技术选型 - 单页应用

打包构建 - VUE-cli 工程化内容 - Eslint + Prettier + TypeScript + Axios UI 库 - AntD 组件化 - Vue.next 路由管理 - Vue-Router 全局状态管理 - Vuex 样式预编译 - Less GIT 钩子 - Husky + Lint-staged + VcmCli

## 项目依赖安装

```install
npm install
```

### 开发与构建

```serve
开发环境代码运行
npm run serve

测试环境代码运行
npm run serve:test

生产环境代码运行
npm run serve:debug
```

### 打包

```build
开发环境代码打包
npm run build

测试环境代码打包
npm run build:debug

生产环境代码打包
npm run build:prod
```

### 校验 css 规范

```lint css
定位全局less|vue|css|scss文件css是否符合规则
npm run lint-css
```

### Run your unit tests

```unit
npm run test:unit
```

### 修复部分代码

```lint
npm run lint
```

### 上传 -- 目前由 Jenkins 发布

```deploy
上传 oss 至开发环境目录
npm run deploy

上传 oss 至测试环境目录
npm run deploy:debug

上传 oss 至生产环境目录
npm run deploy:prod

上传Jenkinsfile由运维维护
```

### git commit 规范

格式：type (scope): subject，其中 type（必需）、scope（可选）和 subject（必需）

```type
用于说明 commit 的类别，只允许使用以下 7 个标识：
  1. feat：新功能（feature）
  2. fix：修补 bug
  3. docs：文档（documentation）
  4. style：格式（不影响代码运行的变动）
  5. refactor：重构（不是新增的功能，也不是修改 bug 的代码变动）
  6. test：增加测试
  7. chore：构建过程或辅助工具的变动
通常 feat 和 fix 会被放入 changelog（变更日志） 中，其他类型则不会。
```

```scope
用于说明 commit 影响的范围，为可选值。通常是文件、路径、功能等
```

```subject
commit 目的的简短描述
```

### VSCode 配置

```vscode
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
