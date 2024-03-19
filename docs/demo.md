# 说明

记录一下自己利用`VitePress`搭建个人博客的过程。[VitePress官网](https://vitepress.dev/zh/)

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

显示在页面顶部的是导航栏。它包含站点标题、全局菜单链接等，对应上图顶部的红框区域。在 vitepress 的配置文件`config.mts` 中设置。  
注意`nav`内每一项的 `link` 属性，是文章的所在目录。[参考链接](https://vitepress.dev/zh/reference/default-theme-nav#navigation-links)

```mts:line-numbers
// .vitepress/config.mts
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "我的web文档站点",
  description: "记录自己学习的文档站点",
  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/what-is-vitepress" },
      { text: "参考", link: "/markdown-examples" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
```

### 下面红框区域

下面的红框区域是首页的主体内容，在 `docs/index.md` 中书写，按照此文件书写即可生成上图效果。

```md
// docs/index.md

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

## 修改文章页

找到导航栏区域右侧的指南，点击后会跳转到文章页。注意需要在`config.mts`中进行配置,也就是行号为`9`的那一行，意思是链接到 `docs/guide/what-is-vitepress.md`文件。  
自行在 docs 文件夹下新建一个名为`guide`的文件夹，然后在该文件夹下新建一个名为`what-is-vitepress.md`的文件，并写入以下内容，即可看到下图中的效果

```md
# 一级标题

一级标题内容

## 二级标题

二级标题内容

### 三级标题

三级标题内容

#### 四级标题

四级标题内容
```

![alt text](/images/demo/wen-zhang.png)

### 修改大纲
修改VitePress的配置文件`config.mts`，即可看到下图的效果（[修改大纲](https://vitepress.dev/zh/reference/default-theme-config#outline)）。原来默认只显示了二级标题，且大纲的标题是英文。
```mts
// .vitepress/config.mts
export default defineConfig({
  themeConfig: {
    outline: { // 页面右侧大纲 // [!code ++]
      label: "页面导航", // 显示在大纲上的标题，默认值是"On this page" // [!code ++]
      level: [2, 6], // 设置显示在大纲上的标题的等级[h2-h6]，默认值是2 // [!code ++]
    },
  },
});
```
![alt text](images/demo/da-gang.png)

### 添加侧边栏
继续修改VitePress的配置文件`config.mts`，`items`的每一项的`link`属性就是对应文章页的链接，改为对应的的文章路径即可。现在，我们可以看到左侧多了侧边栏。细心点可能会发现，右下角也多了一个链接到下一页的文本，称之为`docFooter`,这是VitePress自动为我们生成的。
```mts
// .vitepress/config.mts
export default defineConfig({
  themeConfig: {
    sidebar: [ // [!code ++]
      { // [!code ++]
        text: '简介', // [!code ++]
        items: [ // [!code ++]
          { text: '什么是 VitePress？', link: '/' }, // [!code ++]
          { text: '快速开始', link: '/' }, // [!code ++]
          { text: '路由', link: '/' }, // [!code ++]
          { text: '部署', link: '/' }, // [!code ++]
        ] // [!code ++]
      }, // [!code ++]
      { // [!code ++]
        text: '写作', // [!code ++]
        items: [ // [!code ++]
          { text: 'Markdown扩展', link: '/' }, // [!code ++]
          { text: '资源处理', link: '/' }, // [!code ++]
          { text: '国际化', link: '/' }, // [!code ++]
        ] // [!code ++]
      } // [!code ++]
    ] // [!code ++]
  },
});
```
![alt text](images/demo/ce-bian-lan.png)
### 修改docFooter
现在docFooter里面显示有英文，我们希望显示中文，我们再次修改VitePress的配置文件`config.mts`。  
因为我们当前在第一页，没有上一页，所以只显示下一页。
```mts
// .vitepress/config.mts
export default defineConfig({
  themeConfig: {
    docFooter: { // [!code ++]
      prev: '上一页', // [!code ++]
      next: '下一页' // [!code ++]
    } // [!code ++]
  },
});
```
![alt text](images/demo/doc-footer.png)


## 部署
参考链接[AlbertZhang 的文档站](https://docs.bugdesigner.cn/docs/Tutorial/vitepress.html)、[千帆的博客](https://helloahao096.github.io/helloahao/posts/GitHub%20Action%E4%B8%80%E9%94%AE%E9%83%A8%E7%BD%B2%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2.html)
