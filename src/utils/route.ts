/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-07 10:38:09
 * @LastEditTime: 2021-02-19 17:08:24
 * @LastEditors: liudehua
 */
import { useRouter } from "vue-router";

const Route = {
  setMenuList: function(route: any) {
    const menuList: any = [];
    if (route && route.children && route.children.length) {
      route.children.forEach((item: any) => {
        if (item.meta.isMenu) {
          const routeObj = {
            meta: item.meta,
            name: item.name,
            path: item.path,
            children: item.children
          };
          menuList.push(routeObj);
          this.setMenuList(item);
        }
      });
    }
    return menuList;
  },
  getMenuList: function() {
    const routeList = useRouter().getRoutes();
    const routeData: any = routeList.find((row: any) => {
      return row.name === "app";
    });
    const route = this.setMenuList(routeData);
    return route;
  }
};
export default Route;
