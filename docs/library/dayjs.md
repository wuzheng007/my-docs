# Dayjs 是什么

[Day.js](https://day.js.org/zh-CN/) 是一个极简的 JavaScript 库，可以为现代浏览器解析、验证、操作和显示日期和时间。

## 安装

::: code-group

```sh [npm]
npm add -D dayjs
```

```sh [yarn]
yarn add -D dayjs
```

:::

## 基础核心用法

### 1.初始化与解析

```js
import dayjs from "dayjs";

// 当前时间
const now = dayjs();

// 解析时间字符串
const date1 = dayjs("2024-04-01 00:00:00");
// 解析字符串+ 格式
const date2 = dayjs("12-25-1995", "MM-DD-YYYY");
// 解析时间戳
const date3 = dayjs(1716406400000);
```

### 2. 格式化输出

```js
import dayjs from "dayjs";
// 标准格式
const fDate1 = dayjs().format();
// 自定义格式
const fDate2 = dayjs().format("YYYY-MM-DD HH:mm:ss");
```

### 3. 时间运算操作

```js
import dayjs from "dayjs";
const time = dayjs();
// 加一天
console.log(time.add(1, "day").format("YYYY-MM-DD"));
// 减一天
console.log(time.subtract(1, "day").format("YYYY-MM-DD"));
// 加一周
console.log(time.add(1, "week").format("YYYY-MM-DD"));
// 加一个月
console.log(time.add(1, "month").format("YYYY-MM-DD"));
// 加一年
console.log(time.add(1, "year").format("YYYY-MM-DD"));

// 当天开始的时间
console.log(time.startOf("day").format("YYYY-MM-DD HH:mm:ss"));
// 当天结束的时间
console.log(time.endOf("day").format("YYYY-MM-DD HH:mm:ss"));
// 本周开始的时间
console.log(time.startOf("week").format("YYYY-MM-DD HH:mm:ss"));
// 本周结束的时间
console.log(time.endOf("week").format("YYYY-MM-DD HH:mm:ss"));
```

## 进阶用法

### 1. 国际化支持

```js
import dayjs from "dayjs";
// 加载中文语言包
import "dayjs/locale/zh-cn";
// 配置使用中文语言包
dayjs.locale("zh-cn");

const time = dayjs();
```

### 2. 时间比较

```js
import dayjs from "dayjs";
const time1 = dayjs("2024-04-01 00:00:00");
const time2 = dayjs("2024-04-02 00:00:00");
/* 比较时间 */
// time1是否在time2之前
console.log(time1.isBefore(time2));
// time1是否在time2之后
console.log(time1.isAfter(time2));
// time1是否等于time2
console.log(time1.isSame(time2));
```

### 3. 时间计算

```js
import dayjs from "dayjs";
const time1 = dayjs("2024-04-01 00:00:00");
const time2 = dayjs("2024-04-02 00:00:00");
/* 计算时间差 */
// 计算两个时间之间的天数差
console.log(time1.diff(time2, "day"));
// 计算两个时间之间的小时差
console.log(time1.diff(time2, "hour"));
// 计算两个时间之间的分钟差
console.log(time1.diff(time2, "minute"));
// 计算两个时间之间的秒数差
console.log(time1.diff(time2, "second"));
```
