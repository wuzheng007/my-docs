# Card 卡片

将信息聚合在卡片容器中展示。

## 组件使用

### Props

| 属性      | 说明                                | 类型   | 是否必须 | 默认值 | 可选值               |
| --------- | ----------------------------------- | ------ | -------- | ------ | -------------------- |
| header    | 卡片标题，也可通过`slot#header`传入 | String | 否       | -      | -                    |
| bodyStyle | 卡片内容区样式                      | Object | 否       | -      | -                    |
| bodyClass | 卡片内容区样式类                    | String | 否       | -      | -                    |
| shadow    | 卡片阴影显示时机                    | String | 否       | always | always，hover，never |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 卡片内容       |
| header  | 自定义卡片头部 |
| footer  | 自定义卡片底部 |

## 组件开发

### 模版代码

```vue
<template>
  <div class="zheng-card" :class="{ [`shadow-${shadow}`]: shadow }">
    <!-- 标题 -->
    <div class="zheng-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <!-- 主体 -->
    <div class="zheng-card__body" :style="bodyStyle" :class="bodyClass">
      <slot></slot>
    </div>
    <!-- 页脚 -->
    <div class="zheng-card__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

### 脚本代码

```vue
<script setup>
defineOptions({
  name: "ZhengCard",
});

defineProps({
  // 卡片标题
  header: {
    type: String,
    default: "",
  },
  // 卡片阴影显示时机
  shadow: {
    type: String,
    default: "always",
    validator(val) {
      return ["always", "hover", "never"].includes(val);
    },
  },
  // 卡片主体样式
  bodyStyle: {
    type: Object,
    default: () => ({}),
  },
  // 卡片主体样式类名
  bodyClass: {
    type: String,
    default: "",
  },
});
</script>
```

### 样式代码

```scss
.zheng-card {
  border-radius: var(--zheng-border-radius-base);
  border: var(--zheng-border);
  background-color: (--zheng-bg-color);
  overflow: hidden;
  color: var(--zheng-text-color-primary);

  // 始终显示阴影
  &.shadow-always {
    box-shadow: var(--zheng-box-shadow-light);
  }

  // 鼠标悬浮时显示阴影
  &.shadow-hover:hover {
    box-shadow: var(--zheng-box-shadow-light);
    transition: box-shadow 0.3s;
  }

  // 卡片头部
  &__header {
    padding: 18px 20px;
    border-bottom: 1px solid var(--zheng-border-color);
    box-sizing: border-box;
  }

  // 卡片主体
  &__body {
    padding: 20px;
  }

  // 卡片底部
  &__footer {
    padding: 18px 20px;
    border-top: 1px solid var(--zheng-border-color);
    box-sizing: border-box;
  }
}
```

## 效果预览

![An image](/images/component-library/gif-card.gif)

## 相关参考

1. [element-card.css](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/card.scss)
2. [element-card.vue](https://github.com/element-plus/element-plus/blob/dev/packages/components/card/src/card.vue)
