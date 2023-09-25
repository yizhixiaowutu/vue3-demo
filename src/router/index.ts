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
  ],
});

export default router;
