# 路由配置

## vue-router

### 一、安装 vue-router

```bash
pnpm add vue-router@4
```

### 二、创建路由器实例

```ts
// src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes } from './routes';
// 创建路由器实例
const router = createRouter({
  history: createWebHashHistory(), // 路由模式为哈希模式
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }), // 定义滚动行为
});

export default router;
```

路由规则配置：

```ts
// src/router/routes.ts
// 常量路由
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];
```

### 注册路由器插件

```ts
// src/main.ts
// 引入路由
import router from '@/router/index'; // [!code ++]
createApp(App)
.use(router) // [!code ++]
.mount('#app');
```
