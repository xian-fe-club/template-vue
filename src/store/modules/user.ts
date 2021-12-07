/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-04 15:59:03
 * @LastEditTime: 2021-12-07 19:09:38
 * @LastEditors: Please set LastEditors
 */

import { getUserInfo } from "@/api/user";
import { removeToken } from "@/utils/auth";
import Storage from "@/utils/storage";

const state = {
  token: "",
  name: "",
  avatar: "",
  routers: []
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
  SET_ROLES: (state: Record<string, any>, roles: Array<Record<string, any>>) => {
    state.roles = roles;
  }
};

const actions = {
  genUserInfo(context: any) {
    return new Promise((resolve, reject) => {
      try {
        getUserInfo(state.token)
          .then((response: any) => {
            const { data } = response;
            const commit = context.commit;
            if (!data) {
              throw "验证失败，请重新登录";
            }
            // debugger
            const { roles, name, avatar } = data;
            const account = Storage.get("ACCOUNT");
            // 管理员可不做权限校验;
            if (account !== "admin") {
              // 权限为空
              if (!roles || roles.length <= 0) {
                throw "无权限,请联系管理员添加权限!";
              }
            }
            commit("SET_ROLES", roles || []);
            commit("SET_NAME", name);
            commit("SET_AVATAR", avatar);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  logout(context: any) {
    return new Promise(resolve => {
      removeToken();
      context.commit("SET_ROLES", []);
      Storage.removeAll(["ACCOUNT", "USERINFO"]);
      const loca = window.location;
      loca.href = loca.pathname
        ? loca.origin + loca.pathname + "#/login"
        : loca.origin + "/#/login";
      resolve("");
    });
  }
};

export default { namespaced: true, state, mutations, actions };
