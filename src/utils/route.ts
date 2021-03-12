/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-07 10:38:09
 * @LastEditTime: 2021-03-12 14:18:43
 * @LastEditors: liudehua
 */
import { useRouter } from "vue-router";

const Route = {
  setMenuList(route: any) {
    const menuList: any = [];
    if (route && route.children && route.children.length) {
      route.children.forEach((item: any) => {
        // 获取菜单的路由
        if (item.meta.isMenu) {
          const routeObj = {
            meta: item.meta,
            name: item.name,
            path: item.path,
            children: this.setMenuList(item)
          };
          menuList.push(routeObj);
        }
      });
    }
    return menuList;
  },
  getMenuList() {
    const routeList = useRouter().getRoutes();
    const routeData: any = routeList.find((row: any) => {
      return row.name === "app";
    });
    const route = this.setMenuList(routeData);
    return route;
  }
};
export default Route;
