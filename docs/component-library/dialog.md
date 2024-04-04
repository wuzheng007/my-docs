# Dialog 对话框

## 组件使用

### Props

| 属性        | 说明                                                         | 类型     | 是否必须 | 默认值 | 可选值 |
| ----------- | ------------------------------------------------------------ | -------- | -------- | ------ | ------ |
| v-model     | 是否显示                                                     | Boolean  | 是       | false  | -      |
| title       | 标题                                                         | String   | 否       | 提示   | -      |
| width       | 对话框宽度                                                   | String   | 否       | 50%    | -      |
| top         | 弹窗的 margin-top                                            | String   | 否       | 15vh   | -      |
| beforeClose | 关闭前的回调，事件参数为关闭 Dialog 的方法, 调用即可关闭弹窗 | Function | 否       | 无     | -      |
| appendTo    | 指定整个对话框要挂载的 dom 元素                              | String   | 否       | body   | -      |
| showClose   | 是否展示右上角的关闭图标按钮                                 | Boolean  | 否       | true   | -      |
| cancelText  | 取消按钮文本内容                                             | String   | 否       | 取 消  | -      |
| confirmText | 确定按钮文本内容                                             | String   | 否       | 确 定  | -      |

### Slots

| 插槽名称 | 说明                                                       |
| -------- | ---------------------------------------------------------- |
| default  | 对话框内容                                                 |
| header   | 自定义标题内容，传入此插槽，title 属性设置的标题将失效     |
| footer   | 自定义底部内容，传入此插槽，底部的取消和保存按钮将不会显示 |

### Events

| 事件名称 | 说明                         | 回调参数 |
| -------- | ---------------------------- | -------- |
| closed   | 对话框关闭动画完成的回调     | 无       |
| cancel   | 对话框底部的取消按钮点击回调 | 无       |
| confirm  | 对话框底部的确定按钮点击回调 | 无       |

## 组件开发

### 模板

这里用到了`<Teleport>`和`<Transition>`两个内置组件，使用`<Transition>`组件的`after-leave`钩子在离开过渡完成后，抛出`closed`事件，方便外部在对话框关闭后的进行处理。

```vue
<template>
  <Teleport :to="appendTo">
    <Transition name="modal-fade" @after-leave="emit('closed')">
      <div class="zheng-dialog-modal" v-show="visible">
        <div class="zheng-dialog" ref="dialog">
          <!-- 关闭按钮 -->
          <ZhengIcon
            v-if="showClose"
            icon="close"
            size="xl"
            class="zheng-dialog-close"
            @click="onClose"
          ></ZhengIcon>
          <!-- 头部 -->
          <header class="zheng-dialog__header">
            <slot name="header">{{ title }}</slot>
          </header>
          <!-- 主体 -->
          <div class="zheng-dialog__body" v-if="$slots.default">
            <slot></slot>
          </div>
          <!-- 底部 -->
          <footer class="zheng-dialog__footer">
            <slot name="footer">
              <ZhengButton size="medium" @click="onCancel">{{ cancelText }}</ZhengButton>
              <ZhengButton size="medium" type="primary" @click="onConfirm">{{ confirmText }}</ZhengButton>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
```

### 脚本

```vue
<script setup>
import { ref, onMounted } from "vue";
// 这个宏可以用来直接在 <script setup> 中声明组件选项，而不必使用单独的 <script> 块
defineOptions({
  name: "ZhengDialog",
});
// 仅 <script setup> 中可用的编译宏命令，并不需要显式地导入。声明的 props 会自动暴露给模板。defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: "提示",
  },
  // 弹窗宽度，默认50%
  width: {
    type: String,
    default: "50%",
  },
  // 弹窗顶部的margin-top值，默认15vh
  top: {
    type: String,
    default: "15vh",
  },
  // 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候.
  beforeClose: Function,
  // Dialog 挂载到哪个 DOM 元素，默认body
  appendTo: {
    type: String,
    default: "body",
  },
  // 是否展示右上角的关闭按钮，默认true
  showClose: {
    type: Boolean,
    default: true,
  },
  // 底部取消按钮文本，默认 取 消
  cancelText: {
    type: String,
    default: "取 消",
  },
  // 底部确认按钮文本，默认 确 认
  confirmText: {
    type: String,
    default: "确 认",
  },
});

// 声明要触发的事件：
const emit = defineEmits(["closed", "cancel", "confirm"]);

// 声明一个双向绑定 prop, 通过父组件的 v-model 来使用
const visible = defineModel();

// 弹窗引用
const dialog = ref(null);

onMounted(() => {
  // 组件挂载后，给dialog设置css变量
  dialog.value.style.setProperty("--zheng-dialog-width", props.width);
  dialog.value.style.setProperty("--zheng-dialog-margin-top", props.top);
});

// 点击 关闭图标 处理函数
function onClose() {
  // 如果传入了关闭之前的处理，就先执行传入的函数，并将关闭弹窗的函数作为参数传递出去，让使用者决定关闭弹窗的时机
  if (typeof props.beforeClose === "function") {
    props.beforeClose(closeDialog);
  } else {
    closeDialog();
  }
}

// 点击 取消按钮 处理函数
function onCancel() {
  emit("cancel");
}
// 点击 确认按钮 处理函数
function onConfirm() {
  emit("confirm");
}

// 关闭弹窗
function closeDialog() {
  visible.value = false;
}
</script>
```

### 样式

`.zheng-dialog-modal`是对话框的最外层容器，默认是挂载在`body`标签下；`--zheng-dialog-width`和`--zheng-dialog-margin-top`，这两个css变量，在组件挂载后，会使用脚本进行修改；对话框外层容器和对话框都使用了动画效果。

```scss
.zheng-dialog-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.zheng-dialog {
  --zheng-dialog-width: 50%; // 此变量会根据组件的prop修改
  --zheng-dialog-margin-top: 15vh; // 此变量会根据组件的prop修改
}
.zheng-dialog {
  position: relative;
  box-sizing: border-box;
  width: var(--zheng-dialog-width);
  margin: var(--zheng-dialog-margin-top) auto 0;
  background: var(--zheng-bg-color);
  border-radius: var(--zheng-border-radius-base);
  box-shadow: var(--zheng-box-shadow-base);
  overflow: hidden;
  // 关闭图标
  &-close {
    position: absolute;
    top: 6px;
    right: 10px;
    color: var(--zheng-color-info-light-7);
    cursor: pointer;
    &:hover {
      color: var(--zheng-color-primary);
    }
  }
  // 头部
  &__header {
    padding: 12px 16px;
    border-bottom: var(--zheng-border);
    color: var(--zheng-text-color-primary);
    font-size: var(--zheng-font-size-medium);
  }
  // 主体
  &__body {
    padding: 16px;
  }
  // 底部
  &__footer {
    text-align: right;
    border-top: var(--zheng-border);
    padding: 12px 16px;
  }
}

.modal-fade-enter-active {
  animation: modal-fade 0.3s;
  .zheng-dialog {
    animation: dialog-fade 0.3s;
  }
}
.modal-fade-leave-active {
  animation: modal-fade 0.3s reverse;
  .zheng-dialog {
    animation: dialog-fade 0.3s reverse;
  }
}

// 对话框外层容器动画
@keyframes modal-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
// 对话框动画
@keyframes dialog-fade {
  from {
    // opacity: 0;
    transform: translateY(-20px);
  }
  to {
    // opacity: 1;
    transform: translateY(0);
  }
}
```

## 效果预览

![An image](/images/component-library/gif-dialog.gif)

## 相关参考

1. [element-dialog.scss](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/dialog.scss)
2. [element-dialog.vue](https://github.com/element-plus/element-plus/blob/dev/packages/components/dialog/src/dialog.vue)
