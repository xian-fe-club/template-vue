/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-07 15:29:30
 * @LastEditTime: 2021-12-02 18:10:10
 * @LastEditors: Please set LastEditors
 */
import router from "./router";
import NProgress from "nprogress";
import { getToken } from "@/utils/auth";
import store from "./store";

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to: any, _: any, next: any) => {
  NProgress.start();
  const hasToken = getToken();
  const hasRoles = store.getters.roles && store.getters.roles.length > 0;
  if (hasToken && hasRoles) {
    if (to.path === "/login") {
      next({ path: "/app" });
      NProgress.done();
    } else {
      if (to.meta.title) document.title = to.meta.title;
      next();
    }
  } else if (hasToken && !hasRoles) {
    try {
      await store.dispatch("user/genUserInfo"); // genUserInfo内部将更新路由
      next({ ...to, replace: true });
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
