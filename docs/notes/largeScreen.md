# 大屏开发

可视化大屏在现在已经是很常见了，所以我们有必要也必须要有这个开发能力。当拿到设计稿后，我们首先需要考虑的第一个问题就是**适配**,下面我就来解决一下这个问题

## 适配方案

```js
/**
 * @introduction 防抖函数
 */
export function debounce(fn, delay = 100) {
  let timer
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}
/**
 * @introduction 自动缩放
 * @description 
 * @param {String} selector 选择缩放元素css选择器
 * @param {Object} options 配置信息 
 * @param {Number} options.width 设计稿宽度
 * @param {Number} options.height 设计稿高度
 */
export function autoScale(selector = 'body', options = {}) {
  if (Object.prototype.toString.call(options) !== '[object Object]') {
    throw new Error('options必须是一个对象')
  }
  // 缩放元素
  const el = document.querySelector(selector)
  // 解构配置信息 width: 设计稿宽度，height：设计稿高度 
  const { width = 1920, height = 1080 } = options
  el.style.width = `${width}px`
  el.style.height = `${height}px`
  el.style.transformOrigin = `top left`
  el.style.transition = 'transform 0.5s'

  function init() {
    const scaleX = innerWidth / width // 横向缩放比例
    const scaleY = innerHeight / height // 纵向缩放比例
    const scale = Math.floor(Math.min(scaleX, scaleY) * 100) / 100 // 最终缩放比例
    const x = (innerWidth - width * scale) / 2
    const y = (innerHeight - height * scale) / 2
    el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
  }

  init()
  window.addEventListener('resize', debounce(init, 200))
}
```

## 参考链接

1. [一次搞懂数据大屏适配方案](https://juejin.cn/post/7163932925955112996?searchId=202405111040097C5671274AE98C9EC71C)  
2. [数据大屏最简单自适应方案，无需适配rem单位](https://juejin.cn/post/7148733509744459790?searchId=202405111040097C5671274AE98C9EC71C)
3. [可视化大屏：autofit.js 一行搞定自适应](https://juejin.cn/post/7224015103481118757?searchId=202405111040097C5671274AE98C9EC71C)
