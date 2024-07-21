# CSS

这里样式相关文件统一放置在 src/assets/styles 目录下，方便统一管理和维护。

## 样式入口文件

在 src/assets/styles 目录下创建一个 index.scss 文件，用于导入所有样式文件。
此项目采用的css预处理是 sass，如果没有安装，需要使用 `pnpm add sass -D` 安装一下。

```scss
/* 样式入口文件 */

```

在 main.ts 中导入 index.scss 文件。后面还有需要导入的样式文件，统一在 @/assets/styles/index.scss 中导入即可。

```ts
/* main.ts */
// 导入样式入口文件 // [!code ++]
import '@/assets/styles/index.scss'; // [!code ++]
```

## 样式变量

在 src/assets/styles 目录下创建一个 variables.scss 文件，用于定义样式变量。

```scss
/* 样式变量 */
```

在样式入口文件中导入 variables.scss 文件。

```scss
/* styles/index.scss */
// 导入样式变量文件 // [!code ++]
@import './variables.scss'; // [!code ++]
```

## 全局变量共享

如果我们需要在多个组件中使用样式变量，我们可以通过给css预处理传递一些选项，这样就可以在多个组件中使用样式变量了。
具体可参考 [vite 官方文档说明](https://cn.vitejs.dev/config/shared-options#css-preprocessoroptions)

```ts
/* vite.config.ts */
export default defineConfig({
  //... 其他配置
  css: { // [!code ++]
    preprocessorOptions: { // [!code ++]]
      // 给sass预处理传递一些选项 // [!code ++]]
      scss: { // [!code ++]]
        // 导入指定的样式文件，这样做了以后，@/assets/styles/variables.scss 文件中定义的样式变量，就可以在多个组件中使用了。 // [!code ++]]
        additionalData: `@import "@/assets/styles/variables.scss";`, // [!code ++]]
      }, // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
});
```
