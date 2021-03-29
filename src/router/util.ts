/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-27 14:15:38
 * @LastEditTime: 2021-03-26 16:58:58
 * @LastEditors: Please set LastEditors
 */
export const init = (routeList: any, menuList?: any) => {
  const menuArr: any = [];
  routeList.forEach((routeItem: any) => {
    const route = menuList
      ? menuList.find((item: any) => {
          // 当前权限标识符
          return routeItem.name === item.code;
        })
      : routeItem;
    if (route) {
      routeItem.meta.title = route.routeName || routeItem.meta.title;
      routeItem.meta.icon = route.image || routeItem.meta.icon;
      if (routeItem.children && routeItem.children.length > 0) {
        routeItem.children = init(routeItem.children, menuList);
      }
      menuArr.push(routeItem);
    }
  });
  return menuArr;
};

export const newRoute = (routeList: any, parentRoute?: any) => {
  const menuArr: any = [];
  routeList.forEach((routeItem: any) => {
    routeItem.component = import(`@/${routeItem.component}`);
    const route = routeItem;
    if (route && route.children && route.children.length > 0) {
      const childPath = route.children[0].path;
      // 配置子集路由前缀
      const path = route.path.replace("/", "");
      route.parentPath = parentRoute ? parentRoute.parentPath + "/" + path : path;
      // 配置重定向路由
      route.redirect = `/app/${route.parentPath + "/" + childPath}`;
      route.children = newRoute(routeItem.children, route);
    }
    menuArr.push(route);
  });
  return menuArr;
};

export const initRoute = (routeList: any, list?: any) => {
  const newRouteList = newRoute(init(routeList, list));
  return {
    path: "/app",
    name: "app",
    redirect: newRouteList.length ? newRouteList[0].redirect : "/401",
    component: () => import("@/components/layouts/Layout/index.vue"),
    children: newRouteList
  };
};
