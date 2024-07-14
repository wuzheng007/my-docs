# Dayjs 是什么

[Day.js](https://dayjs.gitee.io/zh-CN/) 是一个极简的 JavaScript 库，可以为现代浏览器解析、验证、操作和显示日期和时间。

## 安装

::: code-group

```sh [npm]
npm add -D dayjs
```

```sh [yarn]
yarn add -D dayjs
```

:::

## 使用

```js
import dayjs from "dayjs";
// 打印当前时间
console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
// 打印当天开始的时间
console.log(dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss"));
// 打印当天结束的时间
console.log(dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"));
// 打印本周开始的时间
console.log(dayjs().startOf("week").format("YYYY-MM-DD HH:mm:ss"));
// 打印本周结束的时间
console.log(dayjs().endOf("week").format("YYYY-MM-DD HH:mm:ss"));
```
