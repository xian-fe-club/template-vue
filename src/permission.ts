/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-07 15:29:30
 * @LastEditTime: 2021-04-01 15:43:36
 * @LastEditors: Please set LastEditors
 */
import router from "./router";
import NProgress from 'nprogress'

router.beforeEach((to: any, _: any, next: any) => {
  NProgress.start()
  if (to.path === "/") {
    NProgress.done()
    return next("/login");
  }
  if (to.meta.title) document.title = to.meta.title;
  next();
  NProgress.done()
});
