# Vue
[Vue](https://cn.vuejs.org/) 是一款用于构建用户界面的 JavaScript 框架。

## 配置自动导入

[![NPM version](https://img.shields.io/npm/v/unplugin-auto-import?label=unplugin-auto-import)](https://www.npmjs.com/package/unplugin-auto-import)
为 Vite、Webpack、Rspack、Rollup 和 esbuild 按需自动导入 API。支持 TypeScript。由 [unplugin](https://github.com/unjs/unplugin) 提供支持。

::: details 点我查看使用前后对比代码
```ts
// 使用前
import { computed, ref } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

// 使用后
const count = ref(0)
const doubled = computed(() => count.value * 2)
```
:::
### 使用

1. 安装
```bash
npm i -D unplugin-auto-import
```

2. 配置
[Vite 官网](https://cn.vitejs.dev/)
::: details 点我查看vite配置
配置vite.config.ts
```ts
import AutoImport from 'unplugin-auto-import/vite' // [!code ++]

export default defineConfig({
  plugins: [
    AutoImport({ // [!code ++]
      // 要注册的全局导入
      imports: [ // [!code ++]
        'vue', // 自动导入 Vue 的 API // [!code ++]
        'vue-router' // [!code ++]
      ], // [!code ++]
      // 生成对应 .d.ts 文件的路径
      // 本地安装 typescript 时默认为 './auto-imports.d.ts'
      // 设置为false可禁用
      dts: true, // [!code ++]
    }),
  ],
})
```
:::

vite.config.ts中配置`dts: true`会在根目录自动生成`auto-imports.d.ts`文件，为了正确提示自动导入的 API 的提示类型，需要对ts进行配置：
::: details 点我查看typescript配置

配置tsconfig.app.json
```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "auto-imports.d.ts", // [!code ++]
    "env.d.ts",
    "src/**/*",
    "src/**/*.vue"
  ],
  "exclude": ["src/**/__tests__/*"]
}
```
:::

### 官方配置说明
::: details 点我查看官方配置（README.md 配置）
```ts
AutoImport({
  // 需要转换的目标文件类型
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
    /\.vue\.[tj]sx?\?vue/, // .vue (启用 vue-loader 的 experimentalInlineMatchResource 时)
    /\.md$/, // .md
  ],

  // 要注册的全局导入
  imports: [
    // 预设
    'vue',
    'vue-router',
    // 自定义导入
    {
      '@vueuse/core': [
        // 命名导入
        'useMouse', // import { useMouse } from '@vueuse/core',
        // 别名
        ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
      ],
      'axios': [
        // 默认导入
        ['default', 'axios'], // import { default as axios } from 'axios',
      ],
      '[package-name]': [
        '[import-names]',
        // 别名
        ['[from]', '[alias]'],
      ],
    },
    // 类型导入示例
    {
      from: 'vue-router',
      imports: ['RouteLocationRaw'],
      type: true, // 仅导入类型
    },
  ],

  // 需要过滤掉的导入正则表达式数组
  ignore: [
    'useMouse',
    'useFetch'
  ],

  // 根据文件名自动导入目录下的默认模块导出
  defaultExportByFilename: false,

  // 扫描目录进行自动导入的选项
  dirsScanOptions: {
    filePatterns: ['*.ts'], // 匹配文件的 Glob 模式
    fileFilter: file => file.endsWith('.ts'), // 文件过滤函数
    types: true // 启用目录下类型的自动导入
  },

  // 目录下的模块自动导入
  // 默认只扫描目录下一级模块
  dirs: [
    './hooks',
    './composables', // 仅根模块
    './composables/**', // 所有嵌套模块
    // ...
    {
      glob: './hooks',
      types: true // 启用类型导入
    },
    {
      glob: './composables',
      types: false // 如果顶层 dirsScanOptions.types 已启用，仅禁用此目录
    }
    // ...
  ],

  // 生成对应 .d.ts 文件的路径
  // 本地安装 typescript 时默认为 './auto-imports.d.ts'
  // 设置为 false 可禁用
  dts: './auto-imports.d.ts',

  // 生成声明文件时要忽略的导入正则表达式数组
  // 当需要为函数提供自定义签名时很有用
  ignoreDts: [
    'ignoredFunction',
    /^ignore_/
  ],

  // 在 Vue 模板内自动导入
  // 参见 https://github.com/unjs/unimport/pull/15 和 https://github.com/unjs/unimport/pull/72
  vueTemplate: false,

  // 在 Vue 模板中自动导入指令
  // 参见 https://github.com/unjs/unimport/pull/374
  vueDirectives: undefined,

  // 自定义解析器，兼容 `unplugin-vue-components`
  // 参见 https://github.com/antfu/unplugin-auto-import/pull/23/
  resolvers: [
    /* ... */
  ],

  // 将自动导入的包包含在 Vite 的 `optimizeDeps` 选项中
  // 建议启用
  viteOptimizeDeps: true,

  // 在其他导入的末尾注入导入
  injectAtEnd: true,

  // 生成对应的 .eslintrc-auto-import.json 文件
  // ESLint 全局变量文档 - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
  eslintrc: {
    enabled: false, // 默认 `false`
    // 提供以 `.mjs` 或 `.cjs` 结尾的路径以生成相应格式的文件
    filepath: './.eslintrc-auto-import.json', // 默认 `./.eslintrc-auto-import.json`
    globalsPropValue: true, // 默认 `true` (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
  },

  // 生成对应的 .biomelintrc-auto-import.json 文件
  // biomejs 扩展文档 - https://biomejs.dev/guides/how-biome-works/#the-extends-option
  biomelintrc: {
    enabled: false, // 默认 `false`
    filepath: './.biomelintrc-auto-import.json', // 默认 `./.biomelintrc-auto-import.json`
  },

  // 将未导入项保存到 JSON 文件供其他工具使用
  dumpUnimportItems: './auto-imports.json', // 默认 `false`
})
```
:::

## 推荐好文

1. [Vue 开发必须知道的 36 个技巧【近 1W 字】](https://juejin.cn/post/6844903959266590728)
2. [vue 项目开发，我遇到了这些问题](https://juejin.cn/post/7119018849353072677#heading-16)
3. [尤大推荐的神器unplugin-vue-components,解放双手!以后再也不用呆呆的手动引入(组件,ui(Element-ui)库,vue hooks等)](https://juejin.cn/post/7012446423367024676?searchId=20250724151215925359C7A368CFBEA06D)
