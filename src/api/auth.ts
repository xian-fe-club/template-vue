/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-19 14:05:56
 * @LastEditTime: 2021-12-07 18:51:23
 * @LastEditors: Please set LastEditors
 */

const login = (params: Record<string, any>) => {
  // TODO 开发需注意
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
