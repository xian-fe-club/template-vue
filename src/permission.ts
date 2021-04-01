/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-07 15:29:30
 * @LastEditTime: 2021-04-01 15:43:36
 * @LastEditors: Please set LastEditors
 */
import router from "./router";

router.beforeEach((to: any, _: any, next: any) => {
  if (to.path === "/") {
    return next("/login");
  }
  if (to.meta.title) document.title = to.meta.title;
  next();
});
