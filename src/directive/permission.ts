/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-03-12 11:15:54
 * @LastEditTime: 2021-03-12 14:17:03
 * @LastEditors: liudehua
 */
import store from "@/store";
export default {
  // 绑定元素的父组件挂载时调用
  mounted(el: Record<string, any>, row: Record<string, any>) {
    // 获取焦点的元素需要添加type类型
    if (row.value) {
      const roles = store.getters.roles;
      const hasPermission = roles.some((role: any) => {
        return row.value === role.code;
      });
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
};
