/* 配置页面顶部的导航栏。它包含站点标题、全局菜单链接等。 */
import { DefaultTheme } from "vitepress"
export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/' // 表示docs/index.md
  },
  {
    text: '组件库',
    link: '/component-library/', // 表示component-library/index.md
    activeMatch: '/component-library/'
  },
  {
    text: '笔记',
    link: '/notes/request',
    activeMatch: '/notes/' // 当用户位于/notes/路径时，该链接处于激活状态
  },
  {
    text: '库',
    link: '/library/dayjs',
    activeMatch: '/library/' // 当用户位于/library/路径时，该链接处于激活状态
  },
  {
    text: '网站',
    link: '/website/blog',
    activeMatch: '/website/'
  },
  /* {
    text: '关于我',
    items: [
      { text: 'Github', link: 'https://github.com/wuzheng007' },
      { text: '掘金', link: 'https://juejin.cn/user/1060404027226311/posts' },
    ]
  } */
]