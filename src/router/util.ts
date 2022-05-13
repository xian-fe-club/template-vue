/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-27 14:15:38
 * @LastEditTime: 2021-12-07 19:21:34
 * @LastEditors: Please set LastEditors
 */
export const init = (routeList: any, menuList?: any) => {
  const menuArr: any = [];
  // menuList 返回权限集合 一维数组
  // value和前端路由name值匹配, 注: 唯一
  // 示例: [{title: '测试', routeName: 'Test'},{title: '测试1', routeName: 'Test1'}]
  routeList.forEach((routeItem: any) => {
    const route = menuList
      ? menuList.find((item: any) => {
          // 当前权限标识符，以后台返回为准
          return routeItem.name === item.routeName;
        })
      : routeItem;
    if (route) {
      // 页面标题
      routeItem.meta.title = route.title || routeItem.meta.title;
      // 菜单图标可配置项可与导航配置使用
      // 用图片可以配置控制,使用iconfont建议前端直接维护
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
  // 获取新路由
  const newRouteList = newRoute(init(routeList, list));
  return {
    path: "/app",
    name: "app",
    redirect: newRouteList.length ? newRouteList[0].redirect : "/401",
    component: () => import("@/components/layouts/layout/index.vue"),
    children: newRouteList
  };
};
