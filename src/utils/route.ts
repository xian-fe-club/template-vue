import router from "@/router";
import store from "@/store";

const Route = {
  setMenuList(routeArr: any, routeList: any) {
    const menuList: any = [];
    if (routeArr?.length) {
      routeArr.forEach((item: any) => {
        const route = routeList.find((res: any) => item.name == res.name);
        if (route) {
          item.meta = route.meta;
          item.name = route.name;
          item.path = route.path;
          menuList.push(item);
          this.setMenuList(item.children, routeList);
        }
      });
    }
    return menuList;
  },
  getMenuList() {
    const routeList = router.getRoutes();
    const route = this.setMenuList(store.getters.routeMenuTreeArr, routeList);
    return route;
  }
};
export default Route;
