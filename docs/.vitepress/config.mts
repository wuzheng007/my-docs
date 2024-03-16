// 使用 defineConfig 辅助函数将为配置选项提供 TypeScript 支持的智能提示。假设 IDE 支持它，那么在 JavaScript 和 TypeScript 中都将触发智能提示。
import { defineConfig } from 'vitepress'
// 导入自定义配置
import { nav } from './relaConf/index'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 应用级配置选项
  base: '/my-docs/',
  title: "我的文档", // 站点标题
  head: [
    ['link', { rel: 'icon', href: '/my-docs/logo.svg' }]
  ],
  // 主题级配置选项
  themeConfig: {
    logo: '/logo.svg', // 导航栏上显示的 Logo，位于站点标题前
    nav: nav, // 导航菜单项的配置
    /* sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ], */

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  }
})
