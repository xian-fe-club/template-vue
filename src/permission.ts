/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-07 15:29:30
 * @LastEditTime: 2021-02-20 15:57:51
 * @LastEditors: liudehua
 */
import router from "./router";
import storage from "./utils/storage";
import store from "./store";

// const addRoutes = (routeList?: any) => {
//   router.addRoute(initRoute(permissionRoutes, routeList));
// };

router.beforeEach(async (to, from, next) => {
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
          next(to.path);
        } catch (error) {
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next(false);
    }
  }
});

export function resetRouter() {
  // router.removeRoute();
}
