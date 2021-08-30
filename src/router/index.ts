import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/pages/auth/login/index.vue";

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
  },
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
              tag: "test"
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
];

const router = createRouter({
  history: createWebHashHistory(process.env.NODE_ENV),
  routes
});

export default router;
