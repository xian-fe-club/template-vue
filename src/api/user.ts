/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-04 15:08:35
 * @LastEditTime: 2021-03-12 14:21:10
 * @LastEditors: liudehua
 */
// import Http from "@/services/axios";
const getUserInfo = (info: {account: string; password: string}) => {
  // 测试
  return new Promise(resolve => {
    let res = {};
    if (info.account === 'admin') {
      res = {
        data: {
          name: "liu",
          avatar: "https://avatars.githubusercontent.com/u/23732011?s=60&v=4",
          roles: [
            {
              routeName: "Login",
              image: "",
              code: "login"
            },
            {
              routeName: "401"
            },
            {
              routeName: "404"
            },
            {
              routeName: "app",
              children: [
                {
                  routeName: 'Test',
                  children: [
                    {
                      routeName: 'About',
                      children: [
                        {
                          routeName: 'About1'
                        },
                        {
                          routeName: 'About2'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    } else {
      res = {
        data: {
          name: "liu",
          avatar: "https://avatars.githubusercontent.com/u/23732011?s=60&v=4",
          roles: [
            {
              routeName: "Login",
              image: "",
              code: "login"
            },
            {
              routeName: "401"
            },
            {
              routeName: "404"
            },
            {
              routeName: "app",
              children: [
                {
                  routeName: 'Test',
                  children: [
                    {
                      routeName: 'About',
                      children: [
                        {
                          routeName: 'About1'
                        },
                        {
                          routeName: 'About3'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
    resolve(res);
  });
  // return Http.get("url", params);
};

export { getUserInfo };
