/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-06 15:30:15
 * @LastEditTime: 2021-03-18 09:25:52
 * @LastEditors: liudehua
 */

const user: any = {
  path: "user",
  name: "User",
  meta: {
    title: "用户管理",
    isMenu: true
  },
  component: () => import("@/components/layouts/Template/index.vue"),
  children: [
    {
      path: "user1",
      name: "User1",
      meta: {
        title: "User1",
        icon: "",
        isMenu: true
      },
      component: () => import("@/pages/user/User1.vue")
    },
    {
      path: "user2",
      name: "User2",
      meta: {
        title: "User2",
        icon: "",
        isMenu: true
      },
      component: () => import("@/pages/user/User2.vue")
    },
    {
      path: "user3",
      name: "User3",
      meta: {
        title: "User3",
        icon: "",
        isMenu: true
      },
      component: () => import("@/pages/user/User3.vue")
    }
  ]
};
export default user;
