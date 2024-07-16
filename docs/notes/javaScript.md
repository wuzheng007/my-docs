# JavaScript

1. [《JavaScript 教程》阮一峰](https://wangdoc.com/javascript/)
2. [《ES6 入门教程》](https://es6.ruanyifeng.com/)

## 代码记录

### SSE 流式传输

[告别轮询，SSE 流式传输可太香了！](https://juejin.cn/post/7355666189475954725)

服务端代码

```js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/events", function (req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let startTime = Date.now();

  const sendEvent = () => {
    // 检查是否已经发送了10秒
    if (Date.now() - startTime >= 10000) {
      res.write("event: close\ndata: {}\n\n"); // 发送一个特殊事件通知客户端关闭
      res.end(); // 关闭连接
      return;
    }

    const data = { message: "Hello World", timestamp: new Date() };
    res.write(`data: ${JSON.stringify(data)}\n\n`);

    // 每隔2秒发送一次消息
    setTimeout(sendEvent, 2000);
  };

  sendEvent();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

客户端代码

```ts
let controller: AbortController | null = null;
// 发送
const getData = async () => {
  controller = new AbortController();
  // 发起请求
  const response = await fetch("/events", {
    method: "GET",
    signal: controller.signal,
  });
  // 如果响应状态不是 2xx，则抛出一个错误
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  if (!response.body) {
    return;
  }
  // 获取响应体的读取器
  const reader = response.body.getReader();
  // 创建一个文本解码器，指定使用 UTF-8 编码
  const decoder = new TextDecoder("utf-8");
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // 读取响应体数据
    const { done, value } = await reader.read();
    console.log("done.value", done, value);
    if (done) {
      break; // done=true时，没有更多数据可读时退出循环
    }
    // 解码 Uint8Array 为字符串
    let str = decoder.decode(value);
    console.log("解码结果", JSON.parse(str.slice(5).trim()));
  }
};
// 取消
const cancel = () => {
  controller && controller.abort();
  controller = null;
};
```

## 精选文章

1. [Fetch API 教程](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

## 扩展链接

1. [一个可以查看 JS 代码执行情况的网站](https://www.jsv9000.app/)
