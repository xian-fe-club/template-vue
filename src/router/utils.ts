import { RouteRecordRaw } from 'vue-router';
import router, { asyncRoutes, constantRoutes } from './index';

// export interface rolesItem {
//   routeName: string;
//   code?: string;
//   image?: string;
//   children?: [];
// }

// 方法二 start
// 方法二：通过角色名、code之类，匹配路由树中meta里面的roles
// /**
//  * 通过meta.role匹配路由
//  * @param roles
//  * @param route
//  */
//  function hasPermission(roles: string[], route: any) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

// /**
//  * 通过权限数组获取新路由
//  * @param routes asyncRoutes
//  * @param roles
//  */
// export function filterAsyncRoutes(routes: Array<RouteRecordRaw>, roles: string[]) {
//   const res: RouteRecordRaw[] = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRoutes(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })
//   return res
// }
// 方法二 end

// 方法三 start
// 方法三通过后台传来的路由的名称匹配当前用户拥有权限的路由
/**
 * @author: zhangWenkai
 * @description: 通过树 routersNameTree 匹配 routers
 * @version: v0.0.1
 */
export function getRoutersByName(routersNameTree: Record<string, any>, routers: RouteRecordRaw[] = asyncRoutes): RouteRecordRaw[] {
  console.log(routersNameTree)
  let res: RouteRecordRaw[] = []
  routers.forEach((route: RouteRecordRaw) => {
    const r = routersNameTree.find((r: any) => r.routeName === route.name)
    if (r) {
      let item: RouteRecordRaw = {
        ...route,
        children: []
      }
      if (r.children && r.children.length > 0) {
        item.children = getRoutersByName(r.children, route.children)
      }
      res.push(item)
    }
  })
  return res
}
// 方法三 end

/**
 * @author: zhangWenkai
 * @description: 判断这个name对应的路由在新路由中是否存在
 * @version: v0.0.1
 */
export function getRouterByName(objName: Record<string, any>, routers: Array<RouteRecordRaw>, rM: any): boolean {
  let r = routers.some(route => {
    if (route.name === objName.name) {
      // r.index = index
      rM.set(objName, route)
      return true
    } else if (route.children && Array.isArray(route.children) && route.children.length > 0) {
      return getRouterByName(objName, route.children, rM)
    }
  })
  return r
}

/**
 * @author: zhangWenkai
 * @description: 重置路由(通过判断名称是否在新路由里新增和删除路由，所以名称不能重复)
 * @version: v0.0.1
 */
export function resetRouterByName(newRouters: Array<RouteRecordRaw>): void {
  const rM = new WeakMap()
  // const routerToName = new WeakMap()
  const names: any = {}
  // 重置 router
  router.getRoutes().forEach((route) => {
    const name: any = route.name
    names[name] = {name}
    getRouterByName(names[name], newRouters, rM)
    if (name && !rM.has(names[name])) { // 新路由里没有这个路由
      router.hasRoute(name) && router.removeRoute(name);
    }
  })
  newRouters.forEach((newRouter: any): void => {
    router.addRoute(newRouter)
  })
}

const rolesToRouters = new WeakMap()
/**
 * @author: zhangWenkai
 * @description: 通过roles获取新路由
 * @version: v0.0.1
 */
export function filierRouters(roles?: any) {
  if (!roles) {
    return constantRoutes
  }
  let newAsyncRouters
  if (rolesToRouters.has(roles)) {
    newAsyncRouters = rolesToRouters.get(roles)
  } else {
    newAsyncRouters = getRoutersByName(roles);
    rolesToRouters.set(roles, newAsyncRouters)
  }
  const newRouters = [...constantRoutes, ...newAsyncRouters] // 模板的路由分为两部分、动态路由只有可能再 asyncRoutes 中。可以根据需求修改newRouters的获取方式
  return newRouters
}
