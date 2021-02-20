/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-04 15:59:03
 * @LastEditTime: 2021-02-19 14:33:23
 * @LastEditors: liudehua
 */

import { getUserInfo } from "@/api/user";

const state = {
  token: "",
  name: "",
  avatar: ""
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
  SET_ROLES: (
    state: Record<string, any>,
    roles: Array<Record<string, any>>
  ) => {
    state.roles = roles;
  }
};

const actions = {
  genUserInfo(context: any) {
    return getUserInfo(context.state.token).then((response: any) => {
      const { data } = response;
      const commit = context.commit;
      if (!data) {
        throw "验证失败，请重新登录";
      }
      const { roles, name, avatar } = data;
      // 权限为空
      if (!roles || roles.length <= 0) {
        throw "无权限,请联系管理员添加权限!";
      }

      commit("SET_ROLES", roles);
      commit("SET_NAME", name);
      commit("SET_AVATAR", avatar);
    });
  }
};

export default { namespaced: true, state, mutations, actions };
