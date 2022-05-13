/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-03-12 11:15:54
 * @LastEditTime: 2021-12-08 11:35:41
 * @LastEditors: Please set LastEditors
 */
import store from "@/store";
import storage from "@/utils/storage";

export default {
  // 绑定元素的父组件挂载时调用
  mounted(el: Record<string, any>, row: Record<string, any>) {
    const account = storage.get("ACCOUNT");
    // 权限控制 注: admin和不控制权限跳过
    if (row.value && store.getters.isPermission && account != "admin") {
      const roles = store.getters.roles;
      const hasPermission = roles.some((role: any) => {
        return row.value === role.routeName;
      });
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
};
