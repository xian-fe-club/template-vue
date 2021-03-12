/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-07 15:29:30
 * @LastEditTime: 2021-03-12 10:24:07
 * @LastEditors: liudehua
 */
import router from "./router";
import storage from "./utils/storage";
import store from "./store";

router.beforeEach(async (to, from, next) => {
  if (to.path === "/") {
    return next("/login");
  }
  if (to.meta.title) document.title = to.meta.title;
  const hasToken = storage.get("TOKEN");
  if (hasToken) {
    if (to.path === "/login") {
      next();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          await store.dispatch("user/genUserInfo");
          await store.dispatch(
            "permission/generateRoutes",
            store.getters.roles
          );
          router.addRoute(store.getters.routes);
          // 获取记录路由是否存在当前登录用户的路由权限中
          const route = router.getRoutes().find(item => {
            return item.path == to.path;
          });
          if (route) {
            next(to.path);
          } else {
            next("/app");
          }
        } catch (error) {
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

export function resetRouter() {
  // router.removeRoute();
}
