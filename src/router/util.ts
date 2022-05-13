import store from "@/store";
import { asyncRoutes } from "@/router/async";
const getRoutes = (list: any, arr: any) => {
  list?.forEach((route: any) => {
    arr.push(route);
    if (route.children && route.children.length) {
      getRoutes(route.children, arr);
    }
  });
};

const init = (routeList: any, menuList: any) => {
  // 不做权限校验跳转权限匹配
  // menuList 本地权限集合 一维数组
  // value和前端路由name值匹配, 注: 唯一
  routeList.forEach((routeItem: any) => {
    const route = menuList.find((item: any) => {
      // 当前权限标识符，以后台返回为准
      return routeItem.functionKey === item.name;
    });
    if (route) {
      routeItem.meta = {};
      routeItem.component = route.component;
      routeItem.path = route.path;
      routeItem.name = route.name;
      routeItem.meta.type = routeItem.type;
      routeItem.meta.title = routeItem.title;
      routeItem.meta.isMenu = route.meta.isMenu;
      routeItem.meta.menuName = route.meta.menuName;
      // 页面标题
      // 菜单图标可配置项可与导航配置使用
      // 用图片可以配置控制,使用iconfont建议前端直接维护

      routeItem.meta.icon = routeItem.icon || route.meta.icon;
      if (routeItem.children && routeItem.children.length) {
        init(routeItem.children, menuList);
      }
    }
  });
};

const newRoute = (routeList: any, parentRoute?: any) => {
  const menuArr: any = [];
  routeList.forEach((routeItem: any) => {
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

export const initRoute = () => {
  let arr: any = [];
  let treeRoutes: any = [];
  let addRouteList: any = [];
  if (store.getters.isPermission) {
    getRoutes(asyncRoutes, arr);
    treeRoutes = store.getters.treeRoutes;
    init(treeRoutes, arr);
    addRouteList = treeRoutes;
  } else {
    addRouteList = [...asyncRoutes];
  }
  // 获取新路由
  const newRouteList = newRoute(addRouteList);
  return {
    path: "/app",
    name: "App",
    redirect: newRouteList.length ? newRouteList[0].redirect ?? "/" + newRouteList[0].path : "/401",
    component: () => import("@/components/layouts/layout/index.vue"),
    children: newRouteList
  };
};
