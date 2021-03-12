/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-04 15:08:35
 * @LastEditTime: 2021-03-12 14:21:10
 * @LastEditors: liudehua
 */
// import Http from "@/services/axios";
const getUserInfo = () => {
  // 测试
  return new Promise(resolve => {
    resolve({
      data: {
        name: "liu",
        avatar: "https://avatars.githubusercontent.com/u/23732011?s=60&v=4",
        roles: [
          {
            routeName: "",
            image: "",
            code: "test"
          }
        ]
      }
    });
  });
  // return Http.get("url", params);
};

export { getUserInfo };
