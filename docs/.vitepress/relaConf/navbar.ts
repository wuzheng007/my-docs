/* 配置页面顶部的导航栏。它包含站点标题、全局菜单链接等。 */
import { DefaultTheme } from "vitepress"
export const nav: DefaultTheme.NavItem[] = [
  {
    text: '首页',
    link: '/' // 表示docs/index.md
  },
  {
    text: '学习记录',
    items: [
      {
        text: 'Vue',
        link: '/notes/vue',  // 表示docs/notes/vue.md
      },
    ],
  },
  {
    text: '库',
    link: '/library/dayjs',
    activeMatch: '/library/' // 当用户位于/library/路径时，该链接处于激活状态
  },
  {
    text: '网站',
    link: '/website/blog',
    activeMatch: '/website/' // 当用户位于/library/路径时，该链接处于激活状态
  },
  /* {
    text: '关于我',
    items: [
      { text: 'Github', link: 'https://github.com/wuzheng007' },
      { text: '掘金', link: 'https://juejin.cn/user/1060404027226311/posts' },
    ]
  } */
]