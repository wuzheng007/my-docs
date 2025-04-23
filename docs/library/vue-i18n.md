# Vue I18n

Vue I18n 是 Vue.js 的国际化插件。它可以轻松地将一些本地化功能集成到你的 Vue.js 应用程序中。

- 使用 Vue3：[vue-i18n](https://vue-i18n.intlify.dev/)
- 使用 Vue2：[vue-i18n v8.x](https://kazupon.github.io/vue-i18n/zh/)

## 开始

### Vue2 中使用

1. i18n 单独放一个目录，避免在 main.js 中引入过多的代码。

```js
// src/i18n/index.js
import Vue from "vue";
import VueI18n from "vue-i18n";

// 引入vue-i18n
Vue.use(VueI18n);

// 创建i18n实例
const i18n = new VueI18n({
  locale: "zh-CN", // 语言环境
  // 语言环境对应消息
  messages: {
    // 英文
    en: {
      name: "Zhang san",
      hello: "hello world",
      age: "{num} sui",
    },
    // 中文
    "zh-CN": {
      name: "张三",
      hello: "你好，世界",
      age: "{num} 岁",
    },
  },
});

// 导出i18n实例
export default i18n;
```

2. 在 main.js 中引入 i18n 实例。

```js
// src/main.js
import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n";

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount("#app");
```

3. 在组件中使用 i18n 实例。
