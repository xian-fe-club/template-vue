/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-04 10:58:26
 * @LastEditTime: 2021-03-29 15:00:05
 * @LastEditors: Please set LastEditors
 */

const modulesFiles = require.context("./modules", true, /\.ts$/);
const modules = modulesFiles.keys().reduce((modules: Record<string, any>, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default modules;
