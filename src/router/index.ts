import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/index.vue"),
    },
    {
      path: "/g6",
      name: "g6",
      component: () => import("@/views/g6.vue"),
    },
    {
      path: "/single-iframe",
      name: "single-iframe",
      component: () => import("@/views/single-iframe/main.vue"),
    },
    {
      path: "/iframe-page",
      name: "iframe-page",
      component: () => import("@/views/single-iframe/iframe.vue"),
    },
  ],
});

export default router;
