import { getUserInfo } from "@/api/user";
import { removeToken } from "@/utils/auth";
import { asyncRoutes } from "@/router/async";
import Storage from "@/utils/storage";

const state = {
  token: "",
  name: "",
  avatar: "",
  routes: [], // 一维权限树
  btnList: [], // 一维按钮权限树
  treeRoutes: [], // 树形权限
  routeMenuTreeArr: [] // 菜单权限
};

const mutations = {
  SET_TOKEN: (state: Record<string, any>, token: string) => {
    state.token = token;
  },
  SET_NAME: (state: Record<string, any>, name: string) => {
    state.name = name;
  },
  SET_AVATAR: (state: Record<string, any>, avatar: string) => {
    state.avatar = avatar;
  },
  SET_ROUTES: (state: Record<string, any>, routes: Array<Record<string, any>>) => {
    state.routes = routes;
  },
  SET_TREE_ROUTES: (state: Record<string, any>, list: Array<RouteItem>) => {
    state.treeRoutes = list;
  },
  SET_ROUTE_MENU_ARR: (state: any, list: Array<RouteItem>) => {
    state.routeMenuTreeArr = list;
  },
  SET_BTN_LIST: (state: Record<string, any>, list: Record<string, any>) => {
    state.btnList = list;
  }
};
interface RouteItem {
  name: string;
  title: string;
  path: string;
  icon: string;
  isMenu: boolean;
  children: Array<RouteItem>;
}
const getSingle = (arr: any, btnArr: any, arrMenu: any, list: any) => {
  if (list && list.length) {
    list.forEach((item: any) => {
      const obj = {
        path: item.path,
        name: item.name,
        meta: {
          title: item.title || item.meta.title,
          icon: item.icon || item.meta.title,
          isMenu: item.isMenu || item.meta.isMenu
        },
        component: item.component,
        children: []
      };
      arr.push(obj);
      if (item.isMenu || item.meta.isMenu) {
        arrMenu.push(obj);
      } else {
        btnArr.push(obj);
      }
      getSingle(arr, btnArr, obj.children, item.children);
    });
  }
};

const actions = {
  genUserInfo(context: any) {
    return new Promise((resolve, reject) => {
      try {
        const commit = context.commit;
        if (!context.rootGetters.isPermission) {
          const arr: Array<RouteItem> = [];
          const btnArr: Array<RouteItem> = [];
          const arrMenu: Array<RouteItem> = [];
          getSingle(arr, btnArr, arrMenu, asyncRoutes);
          commit("SET_TREE_ROUTES", asyncRoutes);
          commit("SET_ROUTE_MENU_ARR", arrMenu);
          commit("SET_ROUTES", arr);
          resolve("");
        } else {
          getUserInfo(state.token)
            .then((response: any) => {
              const { data } = response;
              if (!data) {
                throw "验证失败，请重新登录";
              }
              // TODO 各个项目自行配置
              // TODO treeRoutes 以后台返回为准,
              const { treeRoutes, name, avatar } = data;
              const account = Storage.get("ACCOUNT");
              // 管理员可不做权限校验;
              if (account !== "admin") {
                // 权限为空
                if (!treeRoutes || treeRoutes.length <= 0) {
                  throw "无权限,请联系管理员添加权限!";
                }
              }
              const arr: Array<RouteItem> = [];
              const btnArr: Array<RouteItem> = [];
              const arrMenu: Array<RouteItem> = [];
              getSingle(arr, btnArr, arrMenu, data);
              commit("SET_TREE_ROUTES", treeRoutes);
              commit("SET_ROUTE_MENU_ARR", arrMenu);
              commit("SET_ROUTES", arr);
              commit("SET_NAME", name);
              commit("SET_AVATAR", avatar);
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  logout() {
    return new Promise(resolve => {
      removeToken();
      const loca = window.location;
      loca.href = loca.pathname
        ? loca.origin + loca.pathname + "#/login"
        : loca.origin + "/#/login";
      resolve("");
    });
  }
};

export default { namespaced: true, state, mutations, actions };
