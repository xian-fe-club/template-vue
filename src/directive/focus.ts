/*
 * @Description: input自动获取焦点
 * @Author: liudehua
 * @Date: 2020-12-31 15:01:26
 * @LastEditTime: 2022-05-13 15:44:10
 * @LastEditors: Please set LastEditors
 */

export default {
  // 指令是具有一组生命周期的钩子：
  // 在绑定元素的父组件挂载之前调用
  // beforeMount(el: Record<string, any>, row: Record<string, any>) {
  //   console.log(el, row);
  // },
  // 绑定元素的父组件挂载时调用
  mounted(el: Record<string, any>) {
    // 获取焦点的元素需要添加type类型
    const type = el.tagName.toLocaleLowerCase();
    if (type == "input" || type == "textarea") {
      el.focus();
    } else {
      if (el.getElementsByTagName(type)) {
        el.getElementsByTagName(type)[0].focus();
      }
    }
  }
  // 在包含组件的 VNode 更新之前调用
  // beforeUpdate() {},
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  // updated() {},
  // 在绑定元素的父组件卸载之前调用
  // beforeUnmount() {},
  // 卸载绑定元素的父组件时调用
  // unmounted() {}
};
