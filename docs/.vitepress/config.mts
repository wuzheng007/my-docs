// 使用 defineConfig 辅助函数将为配置选项提供 TypeScript 支持的智能提示。假设 IDE 支持它，那么在 JavaScript 和 TypeScript 中都将触发智能提示。
import { defineConfig } from 'vitepress'
// 导入自定义配置
import { nav, sidebar } from './relaConf/index'
// https://vitepress.dev/reference/site-config
// #region snippet
export default defineConfig({
  // 应用级配置选项
  base: '/my-docs/',
  title: "我的文档", // 站点标题
  markdown: { // 配置 Markdown 解析器选项
    lineNumbers: true //为每个代码块启用行号
  },
  head: [
    ['link', { rel: 'icon', href: '/my-docs/logo.svg' }]
  ],
  // 主题级配置选项
  themeConfig: {
    logo: '/logo.svg', // 导航栏上显示的 Logo，位于站点标题前
    nav, // 导航菜单项的配置
    sidebar, // 配置侧边栏菜单
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
    // 页面右侧大纲
    outline: {
      label: '页面导航', // 显示在大纲上的标题，默认值是"On this page"
      level: [2, 3] // 设置显示在大纲上的标题的等级[h2-h3]，默认值是2
    },
    docFooter: { 
      prev: '上一页', 
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})
// #endregion snippet
