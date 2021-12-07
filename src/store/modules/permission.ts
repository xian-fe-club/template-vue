/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-07 15:49:43
 * @LastEditTime: 2021-12-07 19:25:11
 * @LastEditors: Please set LastEditors
 */

import { initRoute } from "@/router/util";
import storage from "@/utils/storage";
import { asyncRoutes } from "@/router";

const state = {
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
