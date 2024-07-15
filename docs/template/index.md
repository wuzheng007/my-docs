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

二、ESLint 配置

[ESLint](https://eslint.cn/)是一个根据方案识别并报告 ECMAScript/JavaScript 代码问题的工具，其目的是使代码风格更加一致并避免错误。

> [!WARNING]
> ESLint 在 9.x 版本后，有[重大更改](https://eslint.org/docs/head/use/migrate-to-9.0.0)。node 版本和配置文件格式都有变化。

安装并配置 ESLint

```bash
pnpm create @eslint/config@latest
```

![An image](/images/template/install-eslint.png)

按照提示进行配置后，会在项目根目录下生成 `eslint.config.js` 文件（9.x版本），默认内容如下（非高亮的是默认值）：
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
