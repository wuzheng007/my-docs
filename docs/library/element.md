# Element

## Element Plus

[![NPM version](https://img.shields.io/npm/v/element-plus?label=element-plus)](https://www.npmjs.com/package/element-plus)
[Element Plus](https://element-plus.org/zh-CN/) 基于 Vue 3，面向设计师和开发者的组件库

### 配置

配置按需导入、自定义主题、暗色主题
::: code-group

```ts [vite.config.ts]
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite' // [!code ++]
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // [!code ++]
import Components from 'unplugin-vue-components/vite' // [!code ++]
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    // 自动按需引入API
    AutoImport({ // [!code ++]
      resolvers: [ // [!code ++]
        ElementPlusResolver(), // 使用 ElementPlus 的解析器，按需自动引入其 API // [!code ++]
      ], // [!code ++]
    }), // [!code ++]
    // 自动按需注册组件
    Components({ // [!code ++]
      resolvers: [ // [!code ++]
        // 使用 ElementPlus 的解析器，并指定样式文件类型为 sass
        ElementPlusResolver({ // [!code ++]
          importStyle: 'sass', // [!code ++]
        }), // [!code ++]
      ], // [!code ++]
    }), // [!code ++]
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: { // [!code ++]
    preprocessorOptions: { // [!code ++]
      // Sass/SCSS 相关配置
      scss: { // [!code ++]
        // 在每个 SCSS 文件头部自动注入的公共代码
        // 这里引入 ElementPlus 的自定义样式变量文件，并以 * 形式引入，使其变量全局可用
        additionalData: `@use "@/assets/styles/element/index.scss" as *;`, // [!code ++]
      }, // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
})
```

```scss [src/assets/styles/element/index.scss]
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': #ff6700,
    ),
  )
);

// 自定义暗色主题变量
@use './dark.scss';

```

```scss [src/assets/styles/element/dark.scss]
$--colors: (
  'primary': (
    'base': #589ef8,
  ),
);

// 转发 Element Plus 的暗色主题变量并合并自定义颜色
@forward 'element-plus/theme-chalk/src/dark/var.scss' with (
  $colors: $--colors
);

// 加载暗色主题的 CSS 变量
@use 'element-plus/theme-chalk/src/dark/css-vars.scss' as *;

```

:::
[示例代码仓库](https://gitee.com/zheng1657955621/vue3-element-plus)
