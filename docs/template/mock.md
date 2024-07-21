# mock数据

此项目模拟数据使用 mockjs 生成。

## 安装

mockjs 是一个模拟数据生成器，需要安装它。

```bash
pnpm add mockjs
```

[vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md) 是一个 vite 插件，用于生成 mock 数据。

```bash
pnpm add vite-plugin-mock -D
```

## 配置

在 vite.config.ts 中添加如下配置：

```ts
// 提供本地和生产模拟服务的插件 // [!code ++]
import { viteMockServe } from 'vite-plugin-mock'; // [!code ++]

export default defineConfig({
  plugins: [
    // ... 其他插件
    viteMockServe({ // [!code ++]
      mockPath: 'mock', // [!code ++]
      enable: true, // [!code ++]
    }), // [!code ++]
  ],
})
```

## 使用

在项目目录下创建 mock 文件夹，在 mock 文件夹下创建 test.ts 文件，在 test.ts 文件中编写 mock 数据。

```ts
/** test.ts */
import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/get',
    method: 'get',
    response: ({ query }) => {
      console.log(query, 'get');
      return {
        code: 0,
        data: {
          name: 'vben',
        },
      };
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    },
  },
] as MockMethod[];
```

按照上面的配置，在项目中访问定义好的接口，就可以看到 mock 数据了。
