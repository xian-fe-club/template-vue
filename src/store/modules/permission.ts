/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-07 15:49:43
 * @LastEditTime: 2021-02-19 15:33:29
 * @LastEditors: liudehua
 */
import { initRoute } from "@/router/util";
import permissionRoutes from "@/router/base.router";

const state = {
  routes: []
};

const mutations = {
  SET_ROUTES: (state: any, routes: any) => {
    state.routes = routes;
  }
};

const actions = {
  generateRoutes(content: any, roles: any) {
    return new Promise<void>(resolve => {
      let accessedRoutes;
      if (roles.includes("admin")) {
        accessedRoutes = initRoute(permissionRoutes);
      } else {
        accessedRoutes = initRoute(permissionRoutes, roles);
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
