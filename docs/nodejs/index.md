# nodeJS 入门

## CMD 常用命令

| 说明         | 操作  |
| ------------ | ----- |
| 切换盘符     | C: D: |
| 切换工作目录 | cd    |
| 查看目录文件 | dir   |

切换盘符：

```sh
C:
```

列出指定目录及其所有子目录中的文件和目录：

```sh
dir /s
```

## Buffer

### 概念

Buffer 是一个类数组对象，用于表示固定长度的字节序列。它是 Node.js 中处理二进制数据的核心对象。Buffer 本质是一段内存空间，专门用来处理二进制数据。

### 特点

- 长度固定且不可变
- 性能较好，可以直接对计算机内存进行操作
- 每个元素的大小为 1 字节（8 位）

### 使用

## fs 模块

### 文件写入

文件写入就是将 数据 保存到 文件 中，我们可以使用如下几种方法来实现。

| 方法                       | 说明     |
| -------------------------- | -------- |
| writeFile                  | 异步写入 |
| writeFileSync              | 同步写入 |
| appendFile、appendFileSync | 追加写入 |
| createWriteStream | 流式写入 |

#### writeFile 异步写入

#### writeFileSync 同步写入

### 文件读取

## 相关链接

1. [nodeJS 官网](https://nodejs.org/zh-cn)
2. [尚硅谷nodeJs课程笔记](https://gitee.com/river-ice/notes/blob/master/%E5%89%8D%E7%AB%AF/nodejs/%E5%B0%9A%E7%A1%85%E8%B0%B7/01-Buffer.md)
