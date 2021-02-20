/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-07 10:38:09
 * @LastEditTime: 2021-02-04 14:46:14
 * @LastEditors: liudehua
 */
const Util = {
  /**
   * @author: liudehua
   * @description: 深拷贝对象
   * @param {Record} obj
   * @return {*}
   * @version: v0.0.1
   */
  deepCopyObj: function(obj: Record<string, any>, newobj: any = {}) {
    if (obj instanceof Array || typeof obj != "object") {
      return obj;
    }
    for (const attr in obj) {
      newobj[attr] = this.deepCopyObj(obj[attr], newobj);
    }
    return newobj;
  },
  /**
   * @author: liudehua
   * @description: 拷贝已有参数值
   * @param {*} obj 新对象,
   * @param {*} copyObj 被拷贝对象
   * @return {*}
   * @version: v0.0.1
   */
  copyObjValue: function(obj: any, copyObj: any): void {
    for (const attr in obj) {
      obj[attr] = copyObj[attr];
    }
  }
};
export default Util;
