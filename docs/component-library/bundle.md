# 组件库打包

至此，我们的组件已经开发完成，可以打包为一个组件库，方便开发者使用。在打包之前，我们需要做一些配置，具体可见下方说明。

## 书写入口文件

与 `main.js` 同级，新建 `bundle.js`文件，作为打包的入口文件。

```js
/* 导入 fontawesome 核心包 */
import { library } from '@fortawesome/fontawesome-svg-core'

/* 导入 font awesome 图标组件 */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* 导如free-solid-svg-icons所有的图标 */
import { fas } from '@fortawesome/free-solid-svg-icons'

/* 将图标添加到库中 */
library.add(fas)

// 导入样式入口文件
import '@/styles/index.scss'

// 导入所有的自定义组件
import Icon from '@/components/Icon'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Dialog from '@/components/Dialog'

// 自定义组件集合
const components = [Icon, Button, Card, Dialog]

// 组件库是以插件的形式给外部使用，需要是一个有install方法对象或直接是安装函数本身
function install(app) {
  app.component('font-awesome-icon', FontAwesomeIcon)
  components.forEach(component => {
    app.component(component.name, component)
  })
}

// 全部导出
export default install

// 按需导出
export {
  install,
  Icon,
  Button,
  Card,
  Dialog
}
```

## 书写 ES 打包配置

在项目根目录下，与`vite.config.js`同级，新建`vite.es.config.js`文件。配置`publicDir: false`，在打包时，就不会将静态资源服务文件内的文件复制到`outDir`的根路径（打包输出的文件夹）中。

```js
/* 打包为 ES 模块所用的配置文件 */
import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  publicDir: false, // 配置说明 https://cn.vitejs.dev/config/shared-options.html#publicdir
  build: {
    outDir: 'dist/es', // 指定输出路径
    lib: {
      entry: resolve(__dirname, 'src/bundle.js'), // 打包的入口文件
      name: 'ZhengUi',
      fileName: 'zheng-ui', // 包文件输出的名称
      formats: ['es'] // 输出包格式 指定为es模块
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue']
    }
  }
})

```

## 书写 UMD 打包配置

在项目根目录下，与`vite.config.js`同级，新建`vite.umd.config.js`文件。

```js
/* 打包为 umd 模块所用的配置文件 */
import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  publicDir: false,
  build: {
    outDir: 'dist/umd', // 指定输出路径
    lib: {
      entry: resolve(__dirname, 'src/bundle.js'), // 打包的入口文件
      name: 'ZhengUi',
      fileName: 'zheng-ui', // 包文件输出的名称
      formats: ['umd'] // 输出包格式 指定为 umd
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

```

## 修改 package.json

`package.json`配置项可参考[npm官网](https://npm.nodejs.cn/cli/v10/configuring-npm/package-json)和[csdn文章](https://blog.csdn.net/qq_34703156/article/details/121401990)和[node-module/package 包模块章节](https://nodejs.cn/api/packages.html)

```json
{
  "name": "zheng-ui",
  "version": "1.0.0",
  "description": "this is a Vue3 components library",
  "type": "module",
  "license": "MIT",
  "keywords": [
    "vue3",
    "components",
    "library"
  ],
  "files": [
    "dist"
  ],
  "module": "dist/es/zheng-ui.js",
  "main": "dist/umd/zheng-ui.umd.cjs",
  "exports": {
    ".": {
      "import": "./dist/es/zheng-ui.js",
      "require": "./dist/umd/zheng-ui.umd.cjs"
    },
    "./dist/style.css": {
      "import": "./dist/es/style.css",
      "require": "./dist/umd/style.css"
    }
  },
  "scripts": {
    "dev": "vite",
    "build": "npm run build-es && npm run build-umd",
    "build-es": "vite build --config vite.es.config.js",
    "build-umd": "vite build --config vite.umd.config.js",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.5.1",
    "@fortawesome/free-solid-svg-icons": "^6.5.1",
    "@fortawesome/vue-fontawesome": "^3.0.6"
  },
  "peerDependencies": {
    "vue": "^3.4.21"
  },
  "devDependencies": {
    "@rushstack/eslint-patch": "^1.3.3",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    "@vue/eslint-config-prettier": "^8.0.0",
    "eslint": "^8.49.0",
    "eslint-plugin-vue": "^9.17.0",
    "prettier": "^3.0.3",
    "sass": "^1.72.0",
    "vite": "^5.1.6",
    "vue": "^3.4.21",
    "vue-router": "^4.3.0"
  }
}
```

配置修改记录图1：
![An image](/images/component-library/bundle-git.png)

npm脚本修改说明：
增加了构建为不同模块的脚本命令，同时改动了一些依赖，比如`vue`、`vue-router`从`dependencies`移动到`devDependencies`，避免将这两个依赖打包进构建结果，因为这两个依赖只是在我们开发的时候才会使用。`peerDependencies`指定的依赖是这个库正常工作所必须的。
