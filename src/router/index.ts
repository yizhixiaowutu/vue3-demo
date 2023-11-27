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
  ],
})

export default router
