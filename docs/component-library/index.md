# 介绍

本项目记录使用`vue3`从 0-1 搭建一个组件库。

## 准备工作

进入准备创建项目的文件夹，打开`PowerShell`窗口，输入`node -v`查看当前 node 版本，需要按照官方说明，`node`版本需要大于`18.0`。

### 搭建项目

依次次执行以下命令，可参照下面的命令执行记录图片。

```sh
# 创建项目
npm create vue@latest
# 安装依赖
npm install
# 启动项目
npm run dev
```

![An image](/images/component-library/Snipaste_2024-03-24_10-37-44.png)

### 重写根组件

删除 App.vue 内原有代码，写入如下代码。

```vue
<template>
  <h1 class="title">zheng-ui 组件展示</h1>
  <nav class="nav">
    <router-link to="/">Icon</router-link>
    <router-link to="/button">Button</router-link>
    <router-link to="/card">Card</router-link>
    <router-link to="/dialog">Dialog</router-link>
    <router-link to="/pager">Pager</router-link>
    <router-link to="/collapse">Collapse</router-link>
    <router-link to="/tooltip">Tooltip</router-link>
    <router-link to="/dropdown">Dropdown</router-link>
  </nav>
  <div class="display-area">
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
h1.title {
  text-align: center;
  margin-bottom: 1em;
}

.nav {
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1em;
}

.active {
  // 匹配当前路由的router-link的会有这个类名，对应路由配置中的linkActiveClass属性值
  border-bottom: 3px solid #9befbc;
}
</style>
```

### 新建路由组件

在`src/views`目录下，删除原有的文件，新建`Icon.vue`、`Button.vue`、`Card.vue`、`Dialog.vue`、`Pager.vue`、`Collapse.vue`、`Tooltip.vue`、`Dropdown.vue`等路由组件。
![An image](/images/component-library/Snipaste_2024-03-24_14-14-25.png)

### 修改路由配置

在`src/router/index.js`中修改路由配置

```js
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active", // 匹配当前路由的 RouterLink 默认的 CSS class。如果没有提供，则会使用 router-link-active。
  routes: [
    {
      path: "/",
      name: "icon",
      component: () => import("@/views/IconView.vue"),
    },
    {
      path: "/button",
      name: "button",
      component: () => import("@/views/ButtonView.vue"),
    },
    {
      path: "/card",
      name: "card",
      component: () => import("@/views/CardView.vue"),
    },
    {
      path: "/dialog",
      name: "dialog",
      component: () => import("@/views/DialogView.vue"),
    },
    {
      path: "/collapse",
      name: "collapse",
      component: () => import("@/views/CollapseView.vue"),
    },
    {
      path: "/pager",
      name: "pager",
      component: () => import("@/views/PagerView.vue"),
    },
    {
      path: "/tooltip",
      name: "tooltip",
      component: () => import("@/views/TooltipView.vue"),
    },
    {
      path: "/dropdown",
      name: "dropdown",
      component: () => import("@/views/DropdownView.vue"),
    },
  ],
});

export default router;
```

### CSS 样式

针对 CSS 做一些准备工作，方便后期维护，同时也能保证样式统一。

#### 声明 CSS 变量

新建`src/styles/vars.scss`文件，用于声明 css 变量。参考 [var.scss](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss#L118)

```scss
/* 本文件主要用于定义全局样式变量，如颜色、字体等。
参考：https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss#L118 */

// 主题色（和element一致）
$types: (
  primary: #409eff,
  success: #67c23a,
  warning: #e6a23c,
  danger: #f56c6c,
  info: #909399,
);

// 选择文档的根元素 (HTML 中的 <html>) 定义一些全局的css变量
:root {
  // 主体色
  @each $type, $value in $types {
    --zheng-color-#{$type}: #{$value}; // 生成主题色变量
    --zheng-color-#{$type}-dark-2: #{mix($value, #000, 20%)}; // 暗色 主题色变量

    @for $i from 1 through 9 {
      --zheng-color-#{$type}-light-#{$i}: #{mix(
          $value,
          #fff,
          $i * 10%
        )}; // 亮色 主题色变量
    }
  }

  // text（文本）
  --zheng-text-color-primary: #303133;
  --zheng-text-color-regular: #606266;
  --zheng-text-color-secondary: #909399;
  --zheng-text-color-placeholder: #a8abb2;
  --zheng-text-color-disabled: #c0c4cc;
  // border（边框）
  --zheng-border-color: #dcdfe6;
  --zheng-border-color-light: #e4e7ed;
  --zheng-border-color-lighter: #ebeef5;
  --zheng-border-color-extra-light: #f2f6fc;
  --zheng-border-color-dark: #d4d7de;
  --zheng-border-color-darker: #cdd0d6;
  // fill（填充）
  --zheng-fill-color: #f0f2f5;
  --zheng-fill-color-light: #f5f7fa;
  --zheng-fill-color-lighter: #fafafa;
  --zheng-fill-color-extra-light: #fafcff;
  --zheng-fill-color-dark: #ebedf0;
  --zheng-fill-color-darker: #e6e8eb;
  --zheng-fill-color-blank: #ffffff;
  // background（背景）
  --zheng-bg-color: #ffffff;
  --zheng-bg-color-page: #f2f3f5;
  --zheng-bg-color-overlay: #ffffff;

  // border(边框)相关
  --zheng-border-width: 1px;
  --zheng-border-style: solid;
  --zheng-border: var(--zheng-border-width) var(--zheng-border-style) var(--zheng-border-color);
  --zheng-border-color-hover: var(--zheng-text-color-disabled);
  --zheng-border-radius-base: 4px;
  --zheng-border-radius-small: 2px;
  --zheng-border-radius-round: 20px;
  --zheng-border-radius-circle: 100%;

  // font(字体)相关
  --zheng-font-family: "'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif";
  --zheng-font-size-extra-large: 20px;
  --zheng-font-size-large: 18px;
  --zheng-font-size-medium: 16px;
  --zheng-font-size-base: 14px;
  --zheng-font-size-small: 13px;
  --zheng-font-size-extra-small: 12px;

  // disabled相关
  --zheng-disabled-bg-color: var(--zheng-fill-color-light);
  --zheng-disabled-text-color: var(--zheng-text-color-placeholder);
  --zheng-disabled-border-color: var(--zheng-border-color-light);

  // box-shadow相关
  --zheng-box-shadow-base: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px
      rgba(0, 0, 0, 0.08);
  --zheng-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, 0.12);
  --zheng-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, 0.08), 0px 12px 32px
      rgba(0, 0, 0, 0.12), 0px 8px 16px -8px rgba(0, 0, 0, 0.16);
}
```

#### 重置样式

新建`src/styles/reset.scss`文件，用于重置样式。

```scss
body {
  font-family: var(--zheng-font-family);
  font-weight: 400;
  font-size: var(--zheng-font-size-base);
  color: var(--zheng-text-color-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}

a {
  color: var(--zheng-color-primary);
  text-decoration: none;

  &:hover,
  &:focus {
    color: var(--zheng-color-primary-light-3);
  }

  &:active {
    color: var(--zheng-color-primary-dark-2);
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--zheng-text-color-regular);
  font-weight: inherit;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

h1 {
  font-size: calc(var(--zheng-font-size-base) + 6px);
}

h2 {
  font-size: calc(var(--zheng-font-size-base) + 4px);
}

h3 {
  font-size: calc(var(--zheng-font-size-base) + 2px);
}

h4,
h5,
h6,
p {
  font-size: inherit;
}

p {
  line-height: 1.8;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

sup,
sub {
  font-size: calc(var(--zheng-font-size-base) - 1px);
}

small {
  font-size: calc(var(--zheng-font-size-base) - 2px);
}

hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid var(--zheng-border-color-lighter);
}
```

#### CSS 入口文件

新建`src/styles/index.scss`文件，作为样式入口文件，在`main.js`中引入。

```scss
// 样式入口文件
@import "./vars.scss"; // 全局变量

@import "./reset.scss"; // 重置样式
```

```js
// main.js
import "./assets/main.css";
// 导入样式入口文件 // [!code ++]
import "@/styles/index.scss"; // [!code ++]

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
```

### 效果预览

完成以上工作后，可看到如下效果，前期的准备工作都做的差不多了，接下来可以开发组件了。
![An image](/images/component-library/Snipaste_2024-03-24_22-13-05.png)
