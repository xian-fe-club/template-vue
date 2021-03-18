/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-03 18:04:24
 * @LastEditTime: 2021-03-18 09:26:07
 * @LastEditors: liudehua
 */

const test: any = {
  path: "test",
  name: "Test",
  meta: {
    title: "测试",
    icon: "",
    isMenu: true
  },
  component: () => import("@/components/layouts/Template.vue"),
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
      component: () => import("@/components/layouts/Template.vue"),
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
          component: () => import("@/pages/test/about/About1.vue")
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
          component: () => import("@/pages/test/about/About2.vue")
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
          component: () => import("@/pages/test/about/About3.vue")
        }
      ]
    }
  ]
};
export default test;
