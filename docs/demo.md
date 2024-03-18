# 说明

记录一下自己利用`VitePress`搭建个人博客的过程。

## 准备工作

按照[VitePress](https://vitepress.dev/zh/guide/getting-started#installation)官网要求安装环境

- 安装[Node.js](https://nodejs.org/en) 18 及以上版本，本次使用 `node18.18.0`

## 开始

1. 新建一个空的文件夹，取名为 `my-web-docs` ，在 `VSCode` 编辑器中打开。
2. 在终端中运行 `npm add -D vitepress` 命令，安装 `VitePress` 。
3. 在终端中运行 `npx vitepress init` 命令。  
   启动设置向导。

命令和向导操作记录图如下：
![alt text](/images/demo/image-1.png)  
4. 在终端中运行 `npm run docs:dev` 命令，启动本地服务器，即可看到效果，如下图。
![alt text](/images/demo/image-2.png)

## 修改首页

![alt text](/images/demo/image.png)

### 上面红框区域（导航栏）

航栏显示在页面顶部。它包含站点标题、全局菜单链接等，对应上图顶部的红框区域。

```mts
// .vitepress/config.mts
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "我的web文档站点",
  description: "记录自己学习的文档站点",
  themeConfig: {
    nav: [
      { text: "指南", link: "/" },
      { text: "参考", link: "/markdown-examples" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
```

### 下面红框区域

```md
// docs/demo.md

layout: home

hero:
name: "VitePress"
text: "由 Vite 和 Vue 驱动的静态站点生成器"
tagline: 将 Markdown 变成优雅的文档，只需几分钟
image:
src: https://vitepress.dev/vitepress-logo-large.webp
alt: 头像
actions: - theme: brand
text: 说明
link: /markdown-examples - theme: alt
text: 介绍
link: /api-examples

features:

- icon: 📝
  title: 要素 1
  details: 要素 1 的描述
- icon: 💪
  title: 要素 2
  details: 要素 2 的描述
- icon: 🚀
  title: 要素 3
  details: 要素 3 的描述

---
```

参考链接[AlbertZhang 的文档站](https://docs.bugdesigner.cn/docs/Tutorial/vitepress.html)、[千帆的博客](https://helloahao096.github.io/helloahao/posts/GitHub%20Action%E4%B8%80%E9%94%AE%E9%83%A8%E7%BD%B2%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2.html)
