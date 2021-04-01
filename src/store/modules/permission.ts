/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-02-07 15:49:43
 * @LastEditTime: 2021-04-01 15:53:50
 * @LastEditors: Please set LastEditors
 */

const state = {
  routes: []
};

const mutations = {
  SET_ROUTES: (state: any, routes: any) => {
    state.routes = routes;
  }
};

const actions = {
  generateRoutes(content: any) {
    return new Promise<void>(resolve => {
      let accessedRoutes;
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
