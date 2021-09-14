/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-04 15:59:03
 * @LastEditTime: 2021-03-19 09:53:30
 * @LastEditors: liudehua
 */

import { getUserInfo } from "@/api/user";
import { resetRouterByName, filierRouters } from "@/router/utils";
import { removeToken } from "@/utils/auth";
import Storage from "@/utils/storage";
import { RouteRecordRaw } from "vue-router";

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
  },
  SET_ROUTERS: (state: Record<string, any>, routers: RouteRecordRaw[]) => {
    state.routers = routers;
    Storage.set('routers', routers);
  }
};

const actions = {
  genUserInfo(context: any) {
    return new Promise((resolve, reject) => {
      try {
        getUserInfo(state.token).then((response: any) => {
          const { data } = response;
          const commit = context.commit;
          if (!data) {
            throw "验证失败，请重新登录";
          }
          // debugger
          const { roles, name, avatar } = data;
          const account = Storage.get("ACCOUNT");
          // 管理员可不做权限校验
          if (account !== "admin") {
            // 权限为空
            if (!roles || roles.length <= 0) {
              throw "无权限,请联系管理员添加权限!";
            }
          }
          const newRouters = filierRouters(roles);
          resetRouterByName(newRouters);
          commit("SET_ROUTERS", newRouters || []);
          commit("SET_ROLES", roles || []);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      } catch (err) {
        reject(err)
      }
    })
  },
  logout(context: any) {
    return new Promise(resolve => {
      // context.commit("SET_TOKEN", "");
      context.commit("SET_ROLES", []);
      removeToken()
      // Storage.removeAll(["ACCOUNT", "TOKEN", "USERINFO"]);
      Storage.removeAll(["ACCOUNT", "USERINFO"]);
      const newRouters = filierRouters();
      resetRouterByName(newRouters);
      context.commit("SET_ROUTERS", newRouters || []);
      resolve("");
    });
  }
};

export default { namespaced: true, state, mutations, actions };