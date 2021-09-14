/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-04 15:08:35
 * @LastEditTime: 2021-03-12 14:21:10
 * @LastEditors: liudehua
 */
const routers: any = {
  testadmin: {
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
                  },
                  {
                    routeName: 'About3'
                  }
                ]
              }
            ]
          },
          {
            routeName: 'User',
            children: [
              {
                routeName: 'User1'
              },
              {
                routeName: 'User2'
              },
              {
                routeName: 'User3'
              }
            ]
          }
        ]
      }
    ]
  },
  testeditor: {
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
// import Http from "@/services/axios";
const getUserInfo = (token = '') => {
  // 测试
  return new Promise((resolve, reject) => {
    if (routers[token]) {
      resolve({data: routers[token]});
    } else {
      reject('角色不存在')
    }
  });
  // return Http.get("url", params);
};

export { getUserInfo };
