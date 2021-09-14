/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-19 14:05:56
 * @LastEditTime: 2021-02-19 14:06:28
 * @LastEditors: liudehua
 */

const login = (params: Record<string, any>) => {
  console.log(params);
  // 测试
  return new Promise(resolve => {
    resolve({
      data: {
        token: "test" + params.account
      }
    });
  });
  // return Http.get("url", params);
};

export { login };
