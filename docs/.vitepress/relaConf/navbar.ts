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
    items: [
      {
        text: '工具库',
        link: '/library/tools',
      },
    ],
  },
  {
    text: '关于我',
    items: [
      { text: 'Github', link: 'https://github.com/wuzheng007' },
      { text: '掘金', link: 'https://juejin.cn/user/1060404027226311/posts' },
    ]
  }
]