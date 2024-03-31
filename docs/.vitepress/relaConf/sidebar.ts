/* 配置侧边栏 */
import { DefaultTheme } from "vitepress"
export const sidebar: DefaultTheme.Sidebar = {
  /* 组件库的侧边栏 */
  '/component-library/': { base: '/component-library/', items: sidebarComponentLibrary() },
  /* 库的侧边栏 */
  '/library/': { base: '/library/', items: sidebarLibrary() },
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
        { text: '网络请求封装', link: 'request' },
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