// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    /*
      使用外部格式化程序来格式化 ESLint 尚无法处理的文件。需要借助外部插件 eslint-plugin-format
      此需要安装插件，否则会报错，运行 npx eslint 会提示你缺少的插件
    */
    formatters: {
      /**
       * 格式化 CSS、LESS、SCSS 文件，
       * 默认使用 Prettier
       */
      css: true,
      /**
       * 格式化 HTML 文件
       * 默认使用 Prettier
       */
      html: true,
      /**
       * 格式化 Markdown 文件
       * 支持 Prettier 和 dprint
       * 默认使用 Prettier
       */
      markdown: 'prettier',
    },
  },
)
