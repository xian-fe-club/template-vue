/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-04 15:59:03
 * @LastEditTime: 2021-03-12 16:07:00
 * @LastEditors: liudehua
 */

import { getUserInfo } from "@/api/user";
import Storage from "@/utils/storage";

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
    return getUserInfo().then((response: any) => {
      const { data } = response;
      const commit = context.commit;
      if (!data) {
        throw "验证失败，请重新登录";
      }
      const { roles, name, avatar } = data;
      const account = Storage.get("ACCOUNT");
      // 管理员可不做权限校验
      if (account !== "admin") {
        // 权限为空
        if (!roles || roles.length <= 0) {
          throw "无权限,请联系管理员添加权限!";
        }
      }

      commit("SET_ROLES", roles || []);
      commit("SET_NAME", name);
      commit("SET_AVATAR", avatar);
    });
  },
  logout(context: any) {
    return new Promise(resolve => {
      context.commit("SET_TOKEN", "");
      context.commit("SET_ROLES", []);
      Storage.removeAll(["ACCOUNT", "TOKEN", "USERINFO"]);
      resolve("");
    });
  }
};

export default { namespaced: true, state, mutations, actions };
