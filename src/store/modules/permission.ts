/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-07 15:49:43
 * @LastEditTime: 2021-12-08 10:33:19
 * @LastEditors: Please set LastEditors
 */

import { initRoute } from "@/router/util";
import storage from "@/utils/storage";
import { asyncRoutes } from "@/router/async";

const state = {
  // 是否需要权限控制
  isPermission: true,
  route: {}
};

const mutations = {
  SET_ROUTES: (state: any, route: any) => {
    state.route = route;
  }
};

const actions = {
  generateRoutes(content: any, roles: any) {
    return new Promise<void>(resolve => {
      let accessedRoutes;
      const account = storage.get("ACCOUNT");
      if (account === "admin") {
        accessedRoutes = initRoute(asyncRoutes);
      } else {
        accessedRoutes = initRoute(asyncRoutes, roles);
      }
      content.commit("SET_ROUTES", accessedRoutes);
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
