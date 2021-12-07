/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-07 15:29:30
 * @LastEditTime: 2021-12-07 19:29:27
 * @LastEditors: Please set LastEditors
 */
import router from "./router";
import NProgress from "nprogress";
import { getToken } from "@/utils/auth";
import store from "./store";

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist
router.beforeEach(async (to: any, _: any, next: any) => {
  // 跳转登录不做限制
  if (to.path === "/login") {
    next();
  }
  NProgress.start();
  const hasToken = getToken();
  const hasRoles = store.getters.route && store.getters.route.path;
  if (hasToken && hasRoles) {
    if (to.meta.title) document.title = to.meta.title;
    next();
  } else if (hasToken && !hasRoles) {
    try {
      await store.dispatch("user/genUserInfo"); // genUserInfo内部将更新路由
      await store.dispatch("permission/generateRoutes", store.getters.roles);
      router.addRoute(store.getters.route);
      // 获取记录路由是否存在当前登录用户的路由权限中
      const route = router.getRoutes().find((item: any) => {
        return to.name ? item.name == to.name : item.path == to.path;
      });
      route ? next(to.path) : next("/login");
    } catch (err) {
      await store.dispatch("user/logout");
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  } else if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});
