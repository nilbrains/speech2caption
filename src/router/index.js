import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      // 管理员登录
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
      meta: {
        title: "主页",
      },
    },
    {
      // 管理员登录
      path: "/setting",
      name: "setting",
      component: () => import("../views/setting.vue"),
      meta: {
        title: "设置",
      },
    },
  ],
});

export default router;
