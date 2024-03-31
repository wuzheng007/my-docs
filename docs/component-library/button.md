# Button 按钮

Button 组件仿照`element-ui`的按钮组件进行封装。

## 组件使用

### Props

| 参数     | 说明             | 类型    | 是否必须 | 默认值  | 可选值                                           |
| -------- | ---------------- | ------- | -------- | ------- | ------------------------------------------------ |
| type     | 按钮类型         | String  | 否       | default | default, primary, success, warning, danger, info |
| plain    | 是否为朴素按钮   | Boolean | 否       | false   | -                                                |
| round    | 是否为圆角按钮   | Boolean | 否       | false   | -                                                |
| disabled | 是否禁用         | Boolean | 否       | false   | -                                                |
| loading  | 是否为加载中状态 | Boolean | 否       | false   | -                                                |
| icon     | 按钮图标         | String  | 否       | -       | font-awesome 图标库中 solid 风格图标             |
| circle   | 是否为圆形按钮   | Boolean | 否       | false   | -                                                |
| size     | 按钮大小         | String  | 否       | default | medium, small, mini                              |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |

### Events

| 事件名称 | 说明                                        | 回调参数 |
| -------- | ------------------------------------------- | -------- |
| click    | 点击按钮时触发，通 button 原生的 click 事件 | -        |

## 组件开发

此组件的样式、属性设置均参考`element-ui`的按钮组件。

### 模板代码

模板代码非常简单，直接以原生 button 标签作为组件的根元素。`$slots.default`表示默认插槽内容。

```vue
<template>
  <button class="zheng-button" :class="classObj">
    <ZhengIcon v-if="loading" icon="spinner" spin></ZhengIcon>
    <ZhengIcon v-if="icon" :icon="icon"></ZhengIcon>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
```

### 脚本代码

```vue
<script setup>
import { ref } from "vue";
import ZhengIcon from "../Icon/index.vue";
defineOptions({
  name: "ZhengBUtton",
});
const props = defineProps({
  // 类型
  type: {
    type: String,
    validator(val) {
      return ["primary", "success", "info", "warning", "danger"].includes(val);
    },
  },
  // 朴素
  plain: {
    type: Boolean,
    default: false,
  },
  // 圆角
  round: {
    type: Boolean,
    default: false,
  },
  // 禁用, button元素原生自带有 disabled 属性，可利用属性透传特性自动添加到 button 元素上
  /* disabled: {
    type: Boolean,
    default: false
  }, */
  // 加载中
  loading: {
    type: Boolean,
    default: false,
  },
  // 图标 fa-home fa-user
  icon: {
    type: String,
    default: "",
  },
  // 圆形
  circle: {
    type: Boolean,
    default: false,
  },
  // 大小
  size: {
    type: String,
    validator(val) {
      return ["medium", "small", "mini"].includes(val);
    },
  },
});

const classObj = ref({
  [`zheng-button--${props.type}`]: props.type,
  "is-plain": props.plain,
  "is-round": props.round,
  "is-loading": props.loading,
  "is-circle": props.circle,
  [`zheng-button--${props.size}`]: props.size,
});
</script>
```

### 样式代码

样式代码中使用了全局的 css 变量，在`src/styles/vars.scss`中定义，这个文件我们在搭建项目时就已经定义好了。

```scss
/* src/styles/button.scss文件 */
// 定义一些button相关的样式变量
.zheng-button {
  --zheng-button-text-color: var(--zheng-text-color-regular);
  --zheng-button-bg-color: var(--zheng-fill-color);
  --zheng-button-border-color: var(--zheng-border-color);
  --zheng-button-border: var(--zheng-border);

  /* 设置按钮大小时用到的相关变量=====》开始 */
  --zheng-button-padding: 12px 20px;
  --zheng-button-padding--medium: 10px 20px;
  --zheng-button-padding--small: 9px 15px;
  --zheng-button-padding--mini: 7px 15px;

  --zheng-button-font-size: var(--zheng-font-size-base);
  --zheng-button-font-size--medium: var(--zheng-font-size-base);
  --zheng-button-font-size--small: var(--zheng-font-size-extra-small);
  --zheng-button-font-size--mini: var(--zheng-font-size-extra-small);

  --zheng-button-border-radius: var(--zheng-border-radius-base);
  --zheng-button-border-radius--medium: var(--zheng-border-radius-base);
  --zheng-button-border-radius--small: var(--zheng-border-radius-small);
  --zheng-button-border-radius--mini: var(--zheng-border-radius-small);
  /* 设置按钮大小时用到的相关变量=====》结束 */

  /* hover、active、focus */
  --zheng-button-text-color--hover: var(--zheng-color-primary);
  --zheng-button-bg-color--hover: var(--zheng-color-primary-light-1);
  --zheng-button-border-color--hover: var(--zheng-color-primary-light-7);
  // 禁用
  --zheng-button-text-color--disabled: var(--zheng-disabled-text-color);
  --zheng-button-bg-color--disabled: var(--zheng-fill-color-light);
  --zheng-button-border-color--disabled: var(--zheng-border-color-light);
}

.zheng-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  // height: 40px;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  font-weight: 500;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  color: var(--zheng-button-text-color);
  font-size: var(--zheng-button-font-size);
  background-color: var(--zheng-button-bg-color);
  border: var(--zheng-button-border);
  border-color: var(--zheng-button-border-color);
  border-radius: var(--zheng-button-border-radius);
  padding: var(--zheng-button-padding);
  // hover、激活、聚焦
  &:hover,
  &:active,
  &:focus {
    color: var(--zheng-button-text-color--hover);
    background-color: var(--zheng-button-bg-color--hover);
    border-color: var(--zheng-button-border-color--hover);
  }
  // 禁用和加载中的样式
  &:disabled,
  &.is-loading {
    color: var(--zheng-button-text-color--disabled);
    background-color: var(--zheng-button-bg-color--disabled);
    border-color: var(--zheng-button-border-color--disabled);
  }

  &:disabled {
    cursor: not-allowed;
  }
  &.is-loading {
    cursor: auto;
  }
  @each $val in primary, success, info, warning, danger {
    // type-类型
    &.zheng-button--#{$val} {
      --zheng-button-text-color: #fff;
      --zheng-button-text-color--hover: #fff;
      --zheng-button-bg-color: var(--zheng-color-#{$val});
      --zheng-button-bg-color--hover: var(--zheng-color-#{$val}-light-8);
      --zheng-button-border-color--hover: transparent;
      // plain-朴素
      &.is-plain {
        --zheng-button-text-color: var(--zheng-color-#{$val});
        --zheng-button-bg-color: var(--zheng-color-#{$val}-light-1);
        --zheng-button-bg-color--hover: var(--zheng-color-#{$val});
        &:disabled {
          --zheng-button-text-color--disabled: var(
            --zheng-color-#{$val}-light-7
          );
          --zheng-button-bg-color--disabled: var(--zheng-color-#{$val}-light-1);
        }
      }
      &:disabled,
      &.is-loading {
        --zheng-button-text-color--disabled: #fff;
        --zheng-button-bg-color--disabled: var(--zheng-color-#{$val}-light-5);
      }
    }
  }
  // 圆角
  &.is-round {
    border-radius: var(--zheng-border-radius-round);
  }
  // 圆形
  &.is-circle {
    padding: 12px;
    border-radius: 50%;
  }

  @each $val in medium, small, mini {
    &.zheng-button--#{$val} {
      --zheng-button-padding: var(--zheng-button-padding--#{$val});
      --zheng-button-font-size: var(--zheng-button-font-size--#{$val});
      --zheng-button-border-radius: var(--zheng-button-border-radius--#{$val});
    }
  }

  .zheng-icon ~ span {
    margin-left: 5px;
  }
}

button + button {
  margin-left: 10px;
}
```

## 效果预览

![An image](/images/component-library/gif-button.gif)

## 相关参考链接

[element-plus Button 按钮样式代码](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/button.scss)
