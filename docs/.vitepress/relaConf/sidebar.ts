/* 配置侧边栏 */
import { DefaultTheme } from "vitepress"
export const sidebar: DefaultTheme.Sidebar = {
  /* 组件库的侧边栏 */
  '/component-library/': { base: '/component-library/', items: sidebarComponentLibrary() },
  /* 模版的侧边栏 */
  '/template/': { base: '/template/', items: sidebarTemplate() },
  /* 库的侧边栏 */
  '/library/': { base: '/library/', items: sidebarLibrary() },
  /* vscode */
  '/vscode-extension/': { base: '/vscode-extension/', items: sidebarVscodeExtension() },
  /* 笔记 */
  '/notes/': { base: '/notes/', items: sidebarNotes() },
  /* 网站的侧边栏 */
  '/website/': { base: '/website/', items: sidebarWebsite() }
}
function sidebarComponentLibrary() {
  return [
    {
      text: '组件库',
      collapsed: false, // 是否折叠
      items: [
        { text: '准备工作', link: 'index' },
        { text: 'Icon 图标', link: 'icon' },
        { text: 'Button 按钮', link: 'button' },
        { text: 'Card 卡片', link: 'card' },
        { text: 'Dialog 对话框', link: 'dialog' },
        { text: '组件库打包', link: 'bundle' },
        { text: '组件库测试', link: 'test' },
      ]
    }
  ]
}

function sidebarTemplate() {
  return [
    {
      text: '模板',
      collapsed: false, // 是否折叠
      items: [
        { text: '准备工作', link: 'index' },
        { text: 'css', link: 'css' },
        { text: '图标使用', link: 'icon' },
        { text: 'mock数据', link: 'mock' },
        { text: '网络请求', link: 'request' },
        { text: '路由配置', link: 'router' }
      ]
    }
  ]
}
/* 【库】的侧边栏配置 */
function sidebarLibrary() {
  return [
    {
      text: '常用库', // 侧边栏标题
      // collapsed: false, // 是否折叠
      items: [
        { text: 'dayjs', link: 'dayjs' },
        { text: 'decimaljs', link: 'decimaljs' },
        { text: 'pptxgenjs', link: 'pptxgenjs' },
        { text: 'vue', link: 'vue' },
      ]
    }
  ]
}

function sidebarVscodeExtension() {
  return [
    {
      text: 'VSCode扩展开发', // 侧边栏标题
      collapsed: false, // 是否折叠
      items: [
        { text: '开始', link: 'index' },
        { text: '介绍', link: 'introduce' },
        { text: '编程语言功能', link: 'programmaticLanguageFeatures' },
      ]
    }
  ]
}

function sidebarNotes() {
  return [
    {
      text: '个人笔记', // 侧边栏标题
      collapsed: false, // 是否折叠
      items: [
        { text: '集成开发环境', link: 'ide' },
        { text: '网络请求封装', link: 'request' },
        { text: '大屏相关', link: 'largeScreen' },
        { text: '求职面试相关', link: 'jobInterview' },
        { text: '创建多页应用', link: 'createMPA' },
        { text: 'TypeScript', link: 'typeScript' },
        { text: 'CSS', link: 'css' },
        { text: 'JavaScript', link: 'javaScript' },
        { text: 'Git', link: 'git' },
      ]
    }
  ]
}

/* 【网站】侧边栏配置 */
function sidebarWebsite() {
  return [
    {
      text: '常看网站', // 侧边栏标题
      collapsed: false, // 是否折叠
      items: [
        { text: '博客', link: 'blog' },
      ]
    }
  ]
}