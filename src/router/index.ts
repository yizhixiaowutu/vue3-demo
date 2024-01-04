import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue'),
    },
    {
      path: '/g6',
      name: 'g6',
      component: () => import('@/views/g6.vue'),
    },
    {
      path: '/single-iframe',
      name: 'single-iframe',
      component: () => import('@/views/single-iframe/main.vue'),
    },
    {
      path: '/iframe-page',
      name: 'iframe-page',
      component: () => import('@/views/single-iframe/iframe.vue'),
    },
    {
      path: '/file-saver',
      name: 'file-saver',
      component: () => import('@/views/file-saver/index.vue'),
    },
    {
      path: '/element-plus',
      name: 'element-plus',
      component: () => import('@/views/element-plus/index.vue'),
      children: [
        {
          path: '/element-plus/c1',
          name: 'element-plus/c1',
          component: () => import('@/views/element-plus/components/c1.vue'),
        },
        {
          path: '/element-plus/c2',
          name: 'element-plus/c2',
          component: () => import('@/views/element-plus/components/c2.vue'),
        },
        {
          path: '/element-plus/c3',
          name: 'element-plus/c3',
          component: () => import('@/views/element-plus/components/c4.vue'),
        },
        {
          path: '/element-plus/c4',
          name: 'element-plus/c4',
          component: () => import('@/views/element-plus/components/c4.vue'),
        },
      ],
    },
    {
      path: '/store-main',
      name: 'store-main',
      component: () => import('@/views/iframe-store/main.vue'),
    },
    {
      path: '/store-page',
      name: 'store-page',
      component: () => import('@/views/iframe-store/page.vue'),
    },
    {
      // 动态渲染 component
      path: '/array-component',
      name: 'array-component',
      component: () => import('@/views/array-component/index.vue'),
    },
    {
      // 尝试一些好玩的
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/demo/index.vue'),
    },
    {
      // css 学习
      path: '/css',
      name: 'css',
      children: [
        {
          path: '/',
          component: () => import('@/views/css-page/index.vue'),
        },
        {
          path: '/css/background',
          name: 'background',
          component: () => import('@/views/css-page/background.vue'),
        },
        {
          path: '/css/mask',
          name: 'mask',
          component: () => import('@/views/css-page/mask.vue'),
        },
      ],
    },
    {
      // source-code 源码学习相关
      path: '/source-code',
      name: 'source-code',
      children: [
        {
          path: '/',
          component: () => import('@/views/source-code/index.vue'),
        },
        {
          path: '/source-code/vNode',
          name: 'vNode',
          component: () => import('@/views/source-code/components/vNode.vue'),
        },
      ],
    },
  ],
})

export default router
