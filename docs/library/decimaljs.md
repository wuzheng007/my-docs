# decimal.js 是什么

一个的任意精度十进制类型 JavaScript 库。[官网地址](https://mikemcl.github.io/decimal.js/) [中文文档](https://lixingwu.gitee.io/decimal.js_cn/cn/index.html#)

## 安装

```bash
npm i decimal.js
```

## 使用

```js
const arr = [0.1, 0.2, 0.3, 0.4, 0.5];
// 数组求和
const total = arr.reduce((sum, item) => sum.add(item || 0), new Decimal(0));
console.log(total.toNumber(), total.toString()); // 1.5, '1.5

// 两数相加
const num1 = 0.1;
const num2 = 0.2;
const sum = new Decimal(num1).add(num2 || 0);
console.log(sum.toNumber(), sum.toString()); // 0.3, '0.3'
```
