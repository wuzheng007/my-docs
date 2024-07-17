# 准备工作

## 环境准备

- node v18.18.0
- pnpm 8.10.5

## 初始化项目

本项目使用 Viet 搭建，具体可参考 Vite 官网：[搭建第一个 Vite 项目](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)。

```bash
pnpm create vite
```

创建完成后，安转好依赖，就可以使用 `pnpm dev` 启动项目了。

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
    rules: { // [!code ++]
      "no-var": "error", // 不允许使用var声明变量 // [!code ++]
      "prefer-const": "error", // 声明后未重新赋值的变量，要求使用const声明 // [!code ++]
    } // [!code ++]
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
];
```

在 package.json 中添加 ESLint 的 npm 脚本

- lint: 检查代码风格
- lint:fix 自动修复代码风格

```json
{
  "scripts": {
    "lint": "eslint", // [!code ++]
    "lint:fix": "eslint --fix" // [!code ++]
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

```mjs
export default {};
```

#### 三、创建 prettier 忽略文件

创建 .prettierignore 文件命令

```bash
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nnode_modules\ndist\n')"
```

测试格式化命令
::: code-group

```bash [npm]
npx prettier src/main.ts --write
```

```bash [pnpm]
pnpm exec prettier src/main.ts --write
```

:::

### 解决 eslint 与 prettier 冲突

安装 eslint-plugin-prettier 和 eslint-config-prettier 插件。

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

截止到现在，我们的项目已经配置好了 ESLint、Prettier 以及 VSCode 插件。
