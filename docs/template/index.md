# 准备工作

## 环境准备

- node v18.18.0
- pnpm 8.10.5

## 初始化项目

本项目使用 Vite 搭建，具体可参考 Vite 官网：[搭建第一个 Vite 项目](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)。

```bash
pnpm create vite
```

创建完成后，`pnpm i`安装好依赖，就可以使用 `pnpm dev` 启动项目了。

## 项目配置

一、配置启动项目后自动打开浏览器

```json{3}
{
  "scripts": {
    "dev": "vite --open"
  }
}
```

### 配置 ESLint

[ESLint](https://eslint.cn/)是一个根据方案识别并报告 ECMAScript/JavaScript 代码问题的工具，其目的是使代码风格更加一致并避免错误。

> [!WARNING]
> ESLint 在 9.x 版本后，有[重大更改](https://eslint.org/docs/head/use/migrate-to-9.0.0)。node 版本和配置文件格式都有变化。

安装并配置 ESLint

```bash
pnpm create @eslint/config@latest
```

![An image](/images/template/install-eslint.png)

按照提示进行配置后，会在项目根目录下生成 `eslint.config.js` 文件（9.x 版本），默认内容如下（非高亮的是默认值）：

```js
/* eslint.config.js */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"]
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
  { // [!code ++]
    rules: { // [!code ++]
      "no-var": "error", // 不允许使用var声明变量 // [!code ++]
      "prefer-const": "error", // 声明后未重新赋值的变量，要求使用const声明 // [!code ++]
      'vue/multi-word-component-names': 'off', // 关闭组件名大小写警告 // [!code ++]
    } // [!code ++]
  } // [!code ++]
];
```

在 package.json 中添加 ESLint 的 npm 脚本，自动修复代码风格

```json
{
  "scripts": {
    "lint:eslint": "eslint --fix" // [!code ++]
  }
}
```

### 配置 Prettier

[官网](https://www.prettier.cn/)，Prettier 是一个代码格式化工具。

#### 一、安装

```bash
pnpm add --save-dev --save-exact prettier
```

安装 prettier 为开发依赖，`--save-exact`这个选项是确保安装的版本是精确的。即 package.json 文件中记录的版本号不会包含任何语义化版本控制符（如 ^1.2.3 或 ~1.2.3），而是直接使用 1.2.3 这样的确切版本号。这有助于避免在后续安装时自动升级到不兼容的版本。

#### 二、创建 prettier 配置文件

创建配置文件命令

```bash
node --eval "fs.writeFileSync('.prettierrc.mjs','export default {\n}\n')"
```

在项目根目录下创建 `.prettierrc.mjs` 文件，这是[配置文件](https://prettier.io/docs/en/configuration)，配置文件有多种格式，具体可参考官网

```js
/* .prettierrc.mjs */
export default {};
```

#### 三、创建 prettier 忽略文件

[prettier 忽略文件说明](https://prettier.io/docs/en/ignore)
创建 .prettierignore 文件命令

```bash
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nnode_modules\ndist\n')"
```

#### 四、增加 prettier 脚本

在 package.json 中添加 prettier 的 npm 脚本，自动格式化代码，以下脚本是使用 Prettier 来格式化项目中的所有文件。

````json
{
  "scripts": {
    "lint:prettier": "prettier --write ." // [!code ++]
  }
}
测试格式化命令
::: code-group

```bash [npm]
npx prettier src/main.ts --write
````

```bash [pnpm]
pnpm exec prettier src/main.ts --write
```

:::

### 解决 eslint 与 prettier 冲突

安装 [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) 和 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 插件。

```bash
pnpm add --save-dev eslint-plugin-prettier eslint-config-prettier
```

在 `eslint.config.js` 增加如下配置

```js
//eslint.config.js
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"; // [!code ++]
export default [
  //...其他配置
  eslintPluginPrettierRecommended, // [!code ++] // 注意：这行代码必须放在其他配置后面
];
```

此时，eslint 与 prettier 冲突的问题已经解决了。

### VSCode 配置

#### 一、安装插件

1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

#### 二、修改配置

建议修改工作区的配置（配置文件在项目根目录下的.vscode/settings.json），并把配置文件提交到 git，以保证项目所有开发人员都使用相同的代码风格。以下是一个示例，具体配置可参考官网。

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 配置 Husky 和 lint-staged

- [Husky 官网](https://typicode.github.io/husky/zh/)：husky 是一个 Git 钩子工具，它可以在 Git 提交前执行一些脚本。
- [link-staged 官网](https://www.npmjs.com/package/lint-staged)：是一个在 Git 暂存文件上运行 linters（代码检查工具）的工具。它主要用于在提交代码之前确保代码质量，避免不符合规范的代码进入代码库。

#### 一、安装 husky 和 lint-staged

```bash
pnpm add --save-dev husky lint-staged
```

#### 二、husky 初始化

以下命令会在 .husky/ 中创建 pre-commit 脚本，并更新 package.json 中的 prepare 脚本。随后可根据你的工作流进行修改。

```bash
pnpm exec husky init
```

#### 三、lint-staged 配置

在 package.json 中添加 lint-staged 的 npm 脚本，自动格式化代码

```json
{
  "scripts": {
    "dev": "vite --open",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "lint:eslint": "eslint --fix",
    "lint:prettier": "prettier --write .",
    "prepare": "husky"
  },
  "lint-staged": { // [!code ++]
    "*.{ts,tsx,js,json,html,yml,css,less,scss,md}": [ // [!code ++]
      "prettier --write", // [!code ++]
      "eslint --fix" // [!code ++]
    ], // [!code ++]
    "*.vue": [ // [!code ++]
      "prettier --write", // [!code ++]
      "eslint --fix" // [!code ++]
    ] // [!code ++]
  } // [!code ++]
}
```

#### 四、修改 pre-commit 脚本

`pre-commit` 的脚本会在每次提交前执行，可用于检查代码风格、检查测试等。我们可以在 `pre-commit` 脚本中执行 `pnpm exec lint-staged` 命令。这样每次提交前，都会执行上面配置的 lint-staged 脚本，检查并修复代码风格。

至此，husky 和 lint-staged 配置完成。当提交代码时，husky 会自动执行 lint-staged 脚本，检查并修复代码风格。

### 统一包管理器

团队开发时，需要统一包管理器下载依赖，因为不同的包管理器下载依赖的方式不同，会导致依赖版本不一致，可能导致项目无法运行。我们可以强制在项目中使用特定的包管理器，具体做法如下：
[only-allow](https://www.npmjs.com/package/only-allow): 强制使用指定的包管理器，如果当前包管理器不是指定的包管理器，则会报错。

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm" // [!code ++]
  }
}
```

关于 npm 脚本的介绍和使用可参考[官网](https://docs.npmjs.com/cli/v10/using-npm/scripts)，含有 npm 的各种钩子介绍。

## 项目集成

### 配置路径别名

在 vite.config.ts 中配置路径别名，如果编辑器对path报错，可使用 `pnpm add @types/node -D`添加这个依赖，编辑器中就不会报错了。

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // [!code ++]
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { // [!code ++]
    alias: { // [!code ++]
      '@': path.resolve(__dirname, './src'), // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
});
```

修改ts配置文件，在 tsconfig.app.json 中添加如下配置，没有这个文件时，就在 tsconfig.json 中添加如下配置，这样才代码中使用路径别名，编辑器就不会报错了。

```json
// tsconfig.app.json
{
  // ...其他配置
  "compilerOptions": {
    // 路径别名配置
    "baseUrl": "./", // [!code ++]
    "paths": { // [!code ++]
      "@/*": ["src/*"] // [!code ++]
    } // [!code ++]
  }
}
```

### 集成 element-plus

[element-plus 官网](https://element-plus.org/zh-CN/)，按照官网说明，使用[按需导入](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)的方式。

一、安装 element-plus

```bash
pnpm install element-plus
```

二、按需导入
按照官方说明，使用按需导入的方式，避免引入所有组件，可以减小项目体积。

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite' // [!code ++]
import Components from 'unplugin-vue-components/vite' // [!code ++]]
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // [!code ++]]

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({ // [!code ++]
      resolvers: [ElementPlusResolver()], // [!code ++]
    }), // [!code ++]
    Components({ // [!code ++]
      resolvers: [ElementPlusResolver()], // [!code ++]
    }), // [!code ++]
  ],
})
```
