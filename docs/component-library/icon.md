# Icon 图标

`Icon` 组件基于 `FontAwesome` 图标库，参考 [FontAwesome](http://fontawesome.io/icons/) 官网。

## 组件使用说明

支持font-awesome官方组件的全部属性，可设置大小、颜色、动画等，具体可参考：[官网-图标样式](https://docs.fontawesome.com/web/use-with/vue/style#_top)，以下仅列出部分属性，
| 属性名 | 作用 | 类型 | 是否必须 | 默认值 | 可选值 |
| -------- | ---------- | ------ | -------- | ------ | --------------- |
| icon | 设置图标 | String | 是 | 无 | 例: `fa-home` |
| size | 图标大小 | String | 否 | 无 | 2xs-2xl、1x-10x |
| rotation | 设置旋转度数 | String | 否 | 无 | 例如：`90`、`180`|
| flip | 翻转 | String | 否 | 无 |`horizontal`、`vertical`、`both` |

可视化设置图标（设置大小、动画），并即时看到效果，可[参考](https://fontawesome.com/icons/house?f=classic&s=solid)

## 组件开发

Icon组件是利用`FontAwesome`官方提供的`Vue`组件进行二次封装。

### 准备工作

按照[FontAwesome](https://docs.fontawesome.com/web/use-with/vue/#1-add-svg-core)官网说明安装相关依赖

#### 1.下载依赖

图标有多种风格，这里仅安装其中一种免费图标包，

```sh
# 安装核心包
npm i npm i --save @fortawesome/fontawesome-svg-core
# 安装图标包
npm i --save @fortawesome/free-solid-svg-icons
# 安装官方提供vue组件
npm i --save @fortawesome/vue-fontawesome@latest-3
```

#### 2.注册组件

在 `main.js` 中添加以下代码，注册`FontAwesome`官方提供的`Vue`组件。

```js
/* 导入fontawesome核心 */
import { library } from "@fortawesome/fontawesome-svg-core";
/* 导入官方提供的vue组件 */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* 导入免费的solid风格所有的图标 */
import { fas } from "@fortawesome/free-solid-svg-icons";
/* 将图标添加到库中 */
library.add(fas);
/* 注册官方提供的vue组件 */
Vue.component("font-awesome-icon", FontAwesomeIcon);
```

### 开始封装

接下来对fontawesome图标组件进行二次封装

#### 1. 模板和JS

在`src/components/Icon/index.vue`中添加以下代码：

```vue
<template>
  <i class="zheng-icon" :class="{ [`zheng-icon-${type}`]: type }">
    <font-awesome-icon v-bind="$attrs" />
  </i>
</template>

<script setup>
defineOptions({
  name: 'ZhengIcon'
})

defineProps({
  type: { // 颜色类型，也可直接通过style属性直接设置颜色
    type: String,
    validate(value) {
      return ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
    }
  }
})
</script>

<style lang="scss" scoped></style>
```

模板内使用的`font-awesome-icon`组件，我们已经在main.js中注册过，所以可以直接使用。`v-bind="$attrs"`的意思是将父组件的属性透传到`font-awesome-icon`组件。可参考[Vue——属性透传](https://cn.vuejs.org/guide/components/attrs.html)。

#### 2. 样式

在`src/styles/components/icon.scss`中添加如下样式代码:

```scss
.zheng-icon {
  --zheng-icon-color: inherit;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: var(--zheng-icon-color);
  font-size: inherit;
}

@each $value in primary, success, warning, danger, info {
  .zheng-icon-#{$value} {
    --zheng-icon-color: var(--zheng-color-#{$value});
  }
}

```

应用图标组件样式，在`src/styles/index.scss`添加如下高亮代码。

```scss
/* 样式入口文件 */
@import './vars.scss'; // 全局变量

@import './reset.scss'; // 重置样式

// 引入组件相关样式
@import './components/icon.scss'; // 图标组件样式 // [!code ++]

```

至此，Icon组件开发工作已经完成，可以在组件中引入注册后使用了。

## 使用效果

![An image](/images/component-library/gif-icon.gif)
