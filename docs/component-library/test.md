# 组件库测试

至此，我们的组件库已经开发和构建相关工作都已经全部完成，接下来可以进行测试了。

## 本地测试（包管理器）

### 建立组件库符号链接

在组件库根目录下运行 `npm link`命令，这个命令会在全局的 `node_modules` 目录下创建一个该模块(组件库)的符号链接，如下图。
![An image](/images/component-library/test-1.png)

### 项目内链接到组件库

在项目根目录下运行 `npm link zheng-ui`，这个命令会链接到 `node_modules` 内的`zheng-ui`模块，类似与安装了`zheng-ui`。

### 使用组件库

使用时就类似于Element Plus的用法,

1. 在`main.js`引入和注册

```js
import { createApp } from 'vue'
import ZhengUi from 'zheng-ui'
import 'zheng-ui/dist/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ZhengUi)
app.mount('#app')
```

2. 在`App.vue`中使用

```vue
<template>
  <div>
      <ZhengButton>默认按钮</ZhengButton>
      <ZhengButton type="primary">主要按钮</ZhengButton>
      <ZhengButton type="success">成功按钮</ZhengButton>
      <ZhengButton type="info">信息按钮</ZhengButton>
      <ZhengButton type="warning">警告按钮</ZhengButton>
      <ZhengButton type="danger">危险按钮</ZhengButton>
  </div>
</template>
```

3. 效果展示
![An image](/images/component-library/test-2.png)

## 相关链接

1. [npm link 官方说明](https://npm.nodejs.cn/cli/v10/commands/npm-link)
2. [npm link csdn博客说明](https://blog.csdn.net/weixin_42274805/article/details/123474053)
