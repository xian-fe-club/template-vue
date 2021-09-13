import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/pages/auth/login/index.vue";

// export interface rolesItem {
//   routeName: string;
//   code?: string;
//   image?: string;
//   children?: [];
// }

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/login",
//     name: "Login",
//     component: Login,
//     meta: {
//       title: "登录"
//     }
//   },
//   {
//     path: "/401",
//     name: "401",
//     component: () => import("@/pages/error-page/401.vue")
//   },
//   {
//     // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
//     path: "/:pathMatch(.*)*",
//     name: "404",
//     component: () => import("@/pages/error-page/404.vue")
//   },
//   {
//     path: "/app",
//     name: "app",
//     redirect: "/app/test",
//     component: () => import("@/components/layouts/layout/index.vue"),
//     children: [
//       {
//         path: "test",
//         name: "Test",
//         meta: {
//           title: "测试",
//           icon: "",
//           isMenu: true
//         },
//         redirect: "/app/test/about",
//         component: () => import("@/components/layouts/template/index.vue"),
//         children: [
//           {
//             path: "about",
//             name: "About",
//             meta: {
//               title: "about",
//               icon: "",
//               isMenu: true,
//               tag: "test"
//             },
//             redirect: "/app/test/about/about1",
//             component: () => import("@/components/layouts/template/index.vue"),
//             children: [
//               {
//                 path: "about1",
//                 name: "About1",
//                 meta: {
//                   title: "about1",
//                   icon: "",
//                   isMenu: true,
//                   tag: "test"
//                 },
//                 component: () => import("@/pages/test/about/about1/index.vue")
//               },
//               {
//                 path: "about2",
//                 name: "About2",
//                 meta: {
//                   title: "about2",
//                   icon: "",
//                   isMenu: true,
//                   tag: "test"
//                 },
//                 component: () => import("@/pages/test/about/about2/index.vue")
//               },
//               {
//                 path: "about3",
//                 name: "About3",
//                 meta: {
//                   title: "about3",
//                   icon: "",
//                   isMenu: true,
//                   tag: "test"
//                 },
//                 component: () => import("@/pages/test/about/about3/index.vue")
//               }
//             ]
//           }
//         ]
//       },
//       {
//         path: "user",
//         name: "User",
//         meta: {
//           title: "用户管理",
//           isMenu: true
//         },
//         redirect: "/app/user/user1",
//         component: () => import("@/components/layouts/template/index.vue"),
//         children: [
//           {
//             path: "user1",
//             name: "User1",
//             meta: {
//               title: "User1",
//               icon: "",
//               isMenu: true
//             },
//             component: () => import("@/pages/user/user1/index.vue")
//           },
//           {
//             path: "user2",
//             name: "User2",
//             meta: {
//               title: "User2",
//               icon: "",
//               isMenu: true
//             },
//             component: () => import("@/pages/user/user2/index.vue")
//           },
//           {
//             path: "user3",
//             name: "User3",
//             meta: {
//               title: "User3",
//               icon: "",
//               isMenu: true
//             },
//             component: () => import("@/pages/user/user3/index.vue")
//           }
//         ]
//       }
//     ]
//   }
// ];

// const router = createRouter({
//   history: createWebHashHistory(process.env.NODE_ENV),
//   routes
// });

// 方法二： 通过 角色名过滤
// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/login",
//     name: "Login",
//     component: Login,
//     meta: {
//       title: "登录"
//     }
//   },
//   {
//     path: "/401",
//     name: "401",
//     component: () => import("@/pages/error-page/401.vue")
//   },
//   {
//     // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
//     path: "/:pathMatch(.*)*",
//     name: "404",
//     component: () => import("@/pages/error-page/404.vue")
//   },
//   {
//     path: "/app",
//     name: "app",
//     redirect: "/app/test",
//     component: () => import("@/components/layouts/layout/index.vue"),
//     meta: {
//       roles: ['admin', 'editor'] // or you can only set roles in sub nav
//     },
//     children: [
//       {
//         path: "test",
//         name: "Test",
//         meta: {
//           title: "测试",
//           icon: "",
//           isMenu: true,
//           roles: ['admin', 'editor']
//         },
//         redirect: "/app/test/about",
//         component: () => import("@/components/layouts/template/index.vue"),
//         children: [
//           {
//             path: "about",
//             name: "About",
//             meta: {
//               title: "about",
//               icon: "",
//               isMenu: true,
//               tag: "test",
//               roles: ['admin', 'editor']
//             },
//             redirect: "/app/test/about/about1",
//             component: () => import("@/components/layouts/template/index.vue"),
//             children: [
//               {
//                 path: "about1",
//                 name: "About1",
//                 meta: {
//                   title: "about1",
//                   icon: "",
//                   isMenu: true,
//                   tag: "test",
//                   roles: ['admin', 'editor']
//                 },
//                 component: () => import("@/pages/test/about/about1/index.vue")
//               },
//               {
//                 path: "about2",
//                 name: "About2",
//                 meta: {
//                   title: "about2",
//                   icon: "",
//                   isMenu: true,
//                   tag: "test",
//                   roles: ['admin']
//                 },
//                 component: () => import("@/pages/test/about/about2/index.vue")
//               },
//               {
//                 path: "about3",
//                 name: "About3",
//                 meta: {
//                   title: "about3",
//                   icon: "",
//                   isMenu: true,
//                   tag: "test"
//                 },
//                 component: () => import("@/pages/test/about/about3/index.vue")
//               }
//             ]
//           }
//         ]
//       },
//       {
//         path: "user",
//         name: "User",
//         meta: {
//           title: "用户管理",
//           isMenu: true
//         },
//         redirect: "/app/user/user1",
//         component: () => import("@/components/layouts/template/index.vue"),
//         children: [
//           {
//             path: "user1",
//             name: "User1",
//             meta: {
//               title: "User1",
//               icon: "",
//               isMenu: true
//             },
//             component: () => import("@/pages/user/user1/index.vue")
//           },
//           {
//             path: "user2",
//             name: "User2",
//             meta: {
//               title: "User2",
//               icon: "",
//               isMenu: true
//             },
//             component: () => import("@/pages/user/user2/index.vue")
//           },
//           {
//             path: "user3",
//             name: "User3",
//             meta: {
//               title: "User3",
//               icon: "",
//               isMenu: true
//             },
//             component: () => import("@/pages/user/user3/index.vue")
//           }
//         ]
//       }
//     ]
//   }
// ];

// /**
//  * Use meta.role to determine if the current user has permission
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
//  * Filter asynchronous routing tables by recursion
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
// const router = createRouter({
//   history: createWebHashHistory(process.env.NODE_ENV),
//   routes: filterAsyncRoutes(routes, ['editor'])
// });

// 方法二 end

// 方法三： 通过后台传来的 router过滤
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/pages/error-page/401.vue")
  },
  {
    // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/pages/error-page/404.vue")
  }
];

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/app",
    name: "app",
    redirect: "/app/test",
    component: () => import("@/components/layouts/layout/index.vue"),
    children: [
      {
        path: "test",
        name: "Test",
        meta: {
          title: "测试",
          icon: "",
          isMenu: true
        },
        redirect: "/app/test/about",
        component: () => import("@/components/layouts/template/index.vue"),
        children: [
          {
            path: "about",
            name: "About",
            meta: {
              title: "about",
              icon: "",
              isMenu: true,
              tag: "test",
            },
            redirect: "/app/test/about/about1",
            component: () => import("@/components/layouts/template/index.vue"),
            children: [
              {
                path: "about1",
                name: "About1",
                meta: {
                  title: "about1",
                  icon: "",
                  isMenu: true,
                  tag: "test"
                },
                component: () => import("@/pages/test/about/about1/index.vue")
              },
              {
                path: "about2",
                name: "About2",
                meta: {
                  title: "about2",
                  icon: "",
                  isMenu: true,
                  tag: "test"
                },
                component: () => import("@/pages/test/about/about2/index.vue")
              },
              {
                path: "about3",
                name: "About3",
                meta: {
                  title: "about3",
                  icon: "",
                  isMenu: true,
                  tag: "test"
                },
                component: () => import("@/pages/test/about/about3/index.vue")
              }
            ]
          }
        ]
      },
      {
        path: "user",
        name: "User",
        meta: {
          title: "用户管理",
          isMenu: true
        },
        redirect: "/app/user/user1",
        component: () => import("@/components/layouts/template/index.vue"),
        children: [
          {
            path: "user1",
            name: "User1",
            meta: {
              title: "User1",
              icon: "",
              isMenu: true
            },
            component: () => import("@/pages/user/user1/index.vue")
          },
          {
            path: "user2",
            name: "User2",
            meta: {
              title: "User2",
              icon: "",
              isMenu: true
            },
            component: () => import("@/pages/user/user2/index.vue")
          },
          {
            path: "user3",
            name: "User3",
            meta: {
              title: "User3",
              icon: "",
              isMenu: true
            },
            component: () => import("@/pages/user/user3/index.vue")
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.NODE_ENV),
  routes
});

export function getRoutersByName(routersName: any[], routers: RouteRecordRaw[] = asyncRoutes) {
  console.log(routersName)
  let res: any[] = []
  routers.forEach((route: RouteRecordRaw) => {
    const r = routersName.find(r => r.routeName === route.name)
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

export function getRouterIndexByName(objName: any, routers: Array<RouteRecordRaw>, rM: any, routerToName: any) {
  // let r = {
  //   index: -1,
  //   children: []
  // }
  let r = routers.some((route, index) => {
    if (route.name === objName.name) {
      // r.index = index
      rM.set(objName, route)
      // routerToName.set(route, objName)
      return true
    } else if (route.children && Array.isArray(route.children) && route.children.length > 0) {
      return getRouterIndexByName(objName, route.children, rM, routerToName)
    }
  })
  return r
}

// 重置路由(通过判断名称是否在新路由里新增和删除路由，所以名称不能重复)
export function resetRouterByName(nrs: Array<RouteRecordRaw>): void {
  const newRouters = [...routes, ...nrs]
  const rM = new WeakMap()
  const routerToName = new WeakMap()
  const names: any = {}
  // 重置 router
  router.getRoutes().forEach((route) => {
    const name: any = route.name
    names[name] = {name}
    getRouterIndexByName(names[name], newRouters, rM, routerToName)
    if (name && !rM.has(names[name])) { // 新路由里没有这个路由
      router.hasRoute(name) && router.removeRoute(name);
    }
    //  else if (name && index > -1) { // 新路由里有这个路由
    //   rM.set(newRouters[index], 1)
    // }
  })
  // ------------------------------------------------------------TODO ------------------------------------------------------------
  // TODO ！遍历 nrs， 如果发现 nrs里面有 router不存在的router. 不管这个路由再路由树的哪个位置。 这个路由都要从最外层开始 remove掉
  function findRoutersFormMap(newRouters: RouteRecordRaw[]) {
    newRouters.forEach((newRouter: any): void => {
      if (!routerToName.has(newRouter)) {
        router.addRoute(newRouter)
      } else if (newRouter.children && Array.isArray(newRouter.children) && newRouter.children.length > 0) {
        findRoutersFormMap(newRouter.children)
      }
    })
  }
  findRoutersFormMap(newRouters)
  // newRouters.forEach((newRouter: RouteRecordRaw): void => {
  //   if (!routerToName.has(newRouter)) {
  //     router.addRoute(newRouter)
  //   }
  // })
}

export default router;
