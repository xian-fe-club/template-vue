/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-04 15:08:35
 * @LastEditTime: 2021-12-07 19:19:56
 * @LastEditors: Please set LastEditors
 */
const routers: any = {
  testadmin: {
    name: "liu",
    avatar: "https://avatars.githubusercontent.com/u/23732011?s=60&v=4",
    roles: []
  },
  testeditor: {
    name: "liu",
    avatar: "https://avatars.githubusercontent.com/u/23732011?s=60&v=4",
    roles: [
      { routeName: "Test", title: "测试" },
      { routeName: "About", title: "about" },
      { routeName: "About1", title: "About1" },
      { routeName: "User", title: "用户管理" },
      { routeName: "User1", title: "User1" }
    ]
  }
};
// import Http from "@/services/axios";
const getUserInfo = (token = "") => {
  // 测试
  return new Promise((resolve, reject) => {
    if (routers[token]) {
      resolve({ data: routers[token] });
    } else {
      reject("角色不存在");
    }
  });
  // return Http.get("url", params);
};

export { getUserInfo };
