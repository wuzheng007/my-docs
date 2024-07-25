# Axios

[Axios](https://axios-http.com/zh/) 是一个基于 Promise 的网络请求库，作用于 node 和浏览器。在服务器端它使用的是原生的 http 模块，在浏览器端它使用的是 XMLHttpRequest 对象。

## 用法

### 一、安装

```bash
pnpm add axios
```

### 二、使用

在 src/utils/request.ts 文件中对 axios 进行二次封装，导出一个 axios 实例。

```typescript
/** request.ts */
import axios from 'axios';
import { ElMessage } from 'element-plus';
// 创建一个axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 发送请求前的处理
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 处理响应数据
    return response.data;
  },
  (error) => {
    // 处理响应错误
    const { status } = error.response;
    switch (status) {
      case 401:
        ElMessage.error('未登录，请先登录');
        break;
      case 403:
        ElMessage.error('没有权限，请联系管理员');
        break;
      case 404:
        ElMessage.error('请求地址出错');
        break;
      case 500:
        ElMessage.error('服务器内部错误');
        break;
      default:
        ElMessage.error('未知错误');
        break;
    }
    return Promise.reject(error);
  },
);

export default request;
```
