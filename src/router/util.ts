/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-27 14:15:38
 * @LastEditTime: 2021-02-19 14:05:04
 * @LastEditors: liudehua
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
        route.children = init(routeItem.children, menuList);
      }
      menuArr.push(routeItem);
    }
  });
  return menuArr;
};

export const newRoute = (routeList: any, parentRoute?: any) => {
  const menuArr: any = [];
  routeList.forEach((routeItem: any) => {
    const route = routeItem;
    if (route && route.children && route.children.length > 0) {
      const childPath = route.children[0].path;
      // 拼接重定向路由
      route.parentPath = parentRoute
        ? parentRoute.parentPath + "/" + childPath
        : route.path.replace("/", "") + "/" + childPath;
      // 配置重定向路由
      route.redirect = `/app/${route.parentPath}`;
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
    component: () => import("@/components/layouts/Layout.vue"),
    children: newRouteList
  };
};
