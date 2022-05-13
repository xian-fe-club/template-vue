/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-04 15:59:03
 * @LastEditTime: 2022-05-13 15:07:14
 * @LastEditors: Please set LastEditors
 */

const state: {
  routeFinish: boolean;
} = {
  routeFinish: true
};

const mutations = {
  SET_ROUTE_FINISH: (state: Record<string, any>) => {
    state.routeFinish = false;
  }
};

const actions = {};

export default { namespaced: true, state, mutations, actions };
