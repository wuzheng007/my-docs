# ESLint

[ESLint](https://eslint.nodejs.cn/docs/latest/use/getting-started) 是一个用于识别和报告在 ECMAScript/JavaScript 代码中发现的模式的工具，其目标是使代码更加一致并避免错误。

> [!WARNING]
> ESLint 在 9.x 版本后，有[重大更改](https://eslint.org/docs/head/use/migrate-to-9.0.0)。node 版本要求和配置文件格式都有变化。

## 安装和配置

使用此配置无需使用 `Prettier` 了。[@antfu/eslint-config](https://www.npmjs.com/package/@antfu/eslint-config)

```bash
pnpm i -D eslint @antfu/eslint-config
```

在项目根目录下创建 `eslint.config.mjs` 文件，并添加如下 VSCode 设置

::: code-group

```js [eslint.config.mjs]
import antfu from "@antfu/eslint-config";

export default antfu(
  {
    // 配置 antfu 的配置
    // 设置项目的类型，默认为 app
    type: "lib",
    // 开始代码样式格式化
    // stylistic: true,

    // 或者你可以更加细粒度的设置
    stylistic: {
      indent: 2, // 4, or 'tab'
      quotes: "single", // or 'double'
    },
    // TypeScript 和 Vue 是自动检测的，你也可以显式启用它们
    typescript: true,
    // vue: true,

    // 关闭对 JSON 和 YAML 的支持
    jsonc: false,
    yaml: false,

    // 规则覆盖
    vue: {
      overrides: {
        "vue/operator-linebreak": ["error", "before"],
      },
    },

    // 如果没有限制文件类型，则会为每一个文件进行规则重写
    overrides: {},

    // 忽略某些文件或目录
    ignores: [
      "**/fixtures",
      // ...globs
    ],

    /* 
      使用外部格式化程序来格式化 ESLint 尚无法处理的文件
      需要借助外部插件 eslint-plugin-format
      因此需要安装插件，否则会报错
      运行 npx eslint 会提示你缺少的插件 
    */
    formatters: {
      /**
       * 格式化 CSS、LESS、SCSS 文件，还有 Vue 中的 `<style>` 块
       * 默认使用 Prettier
       */
      css: true,
      /**
       * 格式化 HTML 文件
       * 默认使用 Prettier
       */
      html: true,
      /**
       * 格式化 Markdown 文件
       * 支持 Prettier 和 dprint
       * 默认使用 Prettier
       */
      markdown: "prettier",
    },
  },
  // 从第二个参数开始，它们是 ESLint Flat Configs
  // 你可以有多个配置
  {}
);
```

```json [.vscode/settings.json]
{
  // 禁用默认格式化程序，改用 eslint
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // 自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // 在 IDE 中静默样式规则，但仍自动修复它们
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],

  // 为所有支持的语言启用 eslint
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "gql",
    "graphql",
    "astro",
    "svelte",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ]
}
```

:::

可以使用外部格式化程序来格式化 ESLint 尚无法处理的文件（.css、.html 等）。由 [eslint-plugin-format](https://www.npmjs.com/package/eslint-plugin-format) 提供支持。

## 审查 ESLint 配置

如果想查看 ESLint 的具体规则，可以使用 [eslint-config-inspector](https://www.npmjs.com/package/@eslint/config-inspector) 工具。

```bash
npx @eslint/config-inspector
```

以上命令运行成功之后，查看您的 ESLint 配置请访问 `http://localhost:7777/`。配置文件的更改将自动更新.

```bash
npx @eslint/config-inspector --help
```

查看所有可用的 CLI 选项

## 参考资料

- [为什么我不使用 Prettier](https://antfu.me/posts/why-not-prettier-zh)
- [推出 ESLint 配置检查器](https://eslint.org.cn/blog/2024/04/eslint-config-inspector/)
