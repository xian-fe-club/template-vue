import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/pages/auth/login/index.vue";

// 如果不需要前端控制路由权限，直接在constantRoutes完善。
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/pages/errorPage/401.vue")
  },
  // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
  // 404页面不能有name。 原因可以自己加上name然后在动态添加的路由页面刷新测试
  {
    path: "/:pathMatch(.*)*",
    meta: {
      title: "404"
    },
    component: () => import("@/pages/errorPage/404.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.NODE_ENV),
  routes: constantRoutes
});

export default router;
