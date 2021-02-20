/*
 * @Description: 存储服务
 * @Author: liudehua
 * @Date: 2021-02-03 15:21:16
 * @LastEditTime: 2021-02-04 14:45:55
 * @LastEditors: liudehua
 */

const KEY_PREFIX = "yunjifen.";
const Storage = {
  get(key: string, isSession?: boolean) {
    if (!this.isLocalStorage()) {
      return undefined;
    }
    const value = this.getStorage(isSession).getItem(KEY_PREFIX + key);
    if (value) return JSON.parse(value);
    return undefined;
  },
  set(key: string, value: any, isSession?: boolean) {
    if (!this.isLocalStorage()) {
      return undefined;
    }
    value = JSON.stringify(value || "");
    this.getStorage(isSession).setItem(KEY_PREFIX + key, value);
    return true;
  },
  remove(key: string, isSession?: boolean) {
    if (!this.isLocalStorage()) return undefined;
    this.getStorage(isSession).removeItem(KEY_PREFIX + key);
    return true;
  },
  removeAll(keys: any = []) {
    keys.concat(["TOKEN"]).forEach((item: string) => this.remove(item));
  },
  getStorage(isSession?: boolean) {
    return isSession ? sessionStorage : localStorage;
  },
  isLocalStorage() {
    try {
      if (!localStorage) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
};
export default Storage;
