import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/pages/auth/login/index.vue";

// 方法三： 通过后台传来的 router过滤
// 如果不需要前端控制路由权限，直接将routes和asyncRoutes写在一起。
export const constantRoutes: Array<RouteRecordRaw> = [
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
    // 404页面不能有name。 原因可以自己加上name然后在动态添加的路由页面刷新测试
    path: "/:pathMatch(.*)*",
    // name: '404',
    component: () => import("@/pages/error-page/404.vue")
  }
];

/*
 *以下是受权限控制的路由
 *以admin账号登录或者在genUserInfo接口配置返回
 *注:开发使用admin或者自己完善返回值, 数据格式以 /api/user/getUserInfo为准
 *上线以后台返回为准前端路由需和后台返回匹配
 */
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "test",
    name: "Test",
    meta: {
      title: "测试",
      icon: "",
      isMenu: true
    },
    component: () => import("@/components/layouts/template/index.vue"),
    children: [
      {
        path: "about",
        name: "About",
        meta: {
          title: "about",
          icon: "",
          isMenu: true,
          tag: "test"
        },
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
];

const router = createRouter({
  history: createWebHashHistory(process.env.NODE_ENV),
  routes: constantRoutes
});

export default router;
