/* 配置侧边栏 */
import { DefaultTheme } from "vitepress"
export const sidebar: DefaultTheme.Sidebar = {
  /* 库的侧边栏 */
  '/library/': { base: '/library/', items: sidebarLibrary() },
  /* 网站的侧边栏 */
  '/website/': { base: '/website/', items: sidebarWebsite() },
  /* 搭建指南侧边栏 */
  '/demo/': { base: '/guide/', items: sidebarDemo() }
}

/* 【库】的侧边栏配置 */
function sidebarLibrary() {
  return [
    {
      text: '常用库', // 侧边栏标题
      collapsed: false, // 是否折叠
      items: [
        { text: 'dayjs', link: 'dayjs' },
        { text: 'decimaljs', link: 'decimaljs' },
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

function sidebarDemo() {
  return [

  ]
}