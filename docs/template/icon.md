# 图标使用

本项目的图标使用SVG Sprites技术，参考了[手摸手，带你优雅的使用 icon](https://juejin.cn/post/6844903517564436493)

## 依赖插件

先安装依赖的插件，并按照官网说明进行配置

### 安装

[vite-plugin-svg-icons 介绍](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)

```bash
pnpm install vite-plugin-svg-icons -D
```

### 使用

一、在`vite.config.ts`中配置插件

```ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; // [!code ++]

export default defineConfig({
  plugins: [
    // ...其他插件
    createSvgIconsPlugin({ // [!code ++]
      // 指定需要缓存的图标文件夹 // [!code ++]
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // [!code ++]
      // 指定symbolId格式 // [!code ++]
      symbolId: 'icon-[dir]-[name]',  // [!code ++]
    }),
  ],
})
```

二、在 src/main.ts 内引入注册脚本

```ts
import 'virtual:svg-icons-register' // [!code ++]
```

## 添加图标

在 src/assets 目录下新建 icons 图标文件夹，用来存放svg图标文件。

```md
.
├─ src
│  ├─ home.svg
│  └─ book.svg
└─ ... 
```

> [!NOTE]
> 注意：存放svg图标的文件夹，要和前面插件配置的 iconDirs 文件夹一致

## SvgIcon 组件

### 组件封装

在 src/components 目录下新建 SvgIcon 组件，用于封装 SvgIcon 组件

```vue
<template>
  <svg aria-hidden="true" class="svg-icon" :style="getStyle">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { computed } from 'vue';

interface Props {
  prefix?: string;
  name: string; // 图标名
  size?: number | string; // 图标大小，默认1em
  color?: string; // 图标颜色
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const getStyle = computed((): CSSProperties => {
  const { size } = props;
  let s = `${size}`;
  s = `${s.replace('px', '')}px`;
  return {
    width: size ? s : '1em',
    height: size ? s : '1em',
  };
});
</script>
<style>
.svg-icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

```

### 组件使用

在要使用图标的组件中，引入 SvgIcon 组件

```vue
<template>
  <div>
    <SvgIcon name="home" />
    <SvgIcon name="book" size="30" color="#f00"/>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'
</script>
```

## 推荐文章

1. [SVG精简压缩工具svgo简介和初体验](https://www.zhangxinxu.com/wordpress/2016/02/svg-compress-tool-svgo-experience/)
2. [未来必热：SVG Sprites技术介绍](https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/)
