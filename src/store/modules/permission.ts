import { initRoute } from "@/router/util";

const state = {
  // 是否需要权限控制
  isPermission: false,
  isAddRouteStatus: false,
  route: {}
};

const mutations = {
  SET_ROUTES: (state: any, route: any) => {
    state.route = route;
  }
};

const actions = {
  generateRoutes(content: any) {
    return new Promise<void>(resolve => {
      let accessedRoutes: any = [];
      accessedRoutes = initRoute();
      content.state.isAddRouteStatus = true;
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
