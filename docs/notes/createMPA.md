# Vue多页应用项目搭建

由于之前一直做的都是单页应用，没有多页应用的实践，最近安排我们开发一个vscode插件，需要用到多页应用，所以在此记录一下搭建的过程。

## 创建应用

> [!NOTE]
> 环境：node v18.18.0

按照官方文档，运行以下命令，开始创建一个项目

```sh
npm create vue@latest
```

```
√ 请输入项目名称： ... MPA-demo
√ 请输入包名称： ... mpa-demo
√ 是否使用 TypeScript 语法？ ... 是
√ 是否启用 JSX 支持？ ... 否
√ 是否引入 Vue Router 进行单页面应用开发？ ... 是
√ 是否引入 Pinia 用于状态管理？ ... 否
√ 是否引入 Vitest 用于单元测试？ ... 否
√ 是否要引入一款端到端（End to End）测试工具？ » 不需要
√ 是否引入 ESLint 用于代码质量检测？ ... 是
√ 是否引入 Prettier 用于代码格式化？ ... 是
√ 是否引入 Vue DevTools 7 扩展用于调试? (试验阶段) ... 否

```

## 搭建基本框架

### 新增html文件

本次示例共有3个页面，原先有一个`index.html`文件，所以在在同级目录下新增`project1.html`、`project2.html`两个文件即可

### 修改`vite.config.ts`文件

多页面模式配置，可参考[vite官方文档](https://cn.vitejs.dev/guide/build.html#multi-page-app)，`build.rollupOptions.input`对象的键名可自定义，就是在打包之后，依赖的js文件名是以该键名作为前缀。

```ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path' // [!code ++]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: { // [!code ++]
    rollupOptions: { // [!code ++]
      input: { // [!code ++]
        main: resolve(__dirname, 'index.html'), // [!code ++]
        project1: resolve(__dirname, 'project1.html'), // [!code ++]
        project2: resolve(__dirname, 'project2.html') // [!code ++]
      } // [!code ++]
    } // [!code ++]
  } // [!code ++]
})

```

### 配置路由

默认的路由按照正常的配置即可，但是非首页的页面，需要单独配置，比如`src/pages/project1/router/index.ts`。第6行到第14行处理了一下，其他页面的路由配置类似。

::: warning
未配置第6行到14行，会在进入页面时，路由会有告警。
:::

```ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/project1',
    },
    {
      path: '/project1',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

```

## 目录结构

目录结构大体上是这样的，详情可按照源码

```
.
├─ src
│  ├─ App.vue
│  ├─ main.ts
│  ├─ pages
│  │  ├─ project1
│  │  │  ├─ router
│  │  │  ├─ views
│  │  │  ├─ App.vue
│  │  │  └─ main.ts
│  │  ├─ project2
│  │  │  ├─ router
│  │  │  ├─ views
│  │  │  ├─ App.vue
│  │  │  └─ main.ts
├─ index.html  
├─ project1.html  
└─ project2.html  
```

## 源码下载

[github](https://github.com/wuzheng007/MAP-demo)

## 参考链接

1. [vite官方文档](https://cn.vitejs.dev/)
