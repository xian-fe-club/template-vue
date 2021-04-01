/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-27 14:40:59
 * @LastEditTime: 2021-04-01 14:38:22
 * @LastEditors: Please set LastEditors
 */
const modulesFiles = require.context("./modules", true, /\.json$/);
const modules = modulesFiles.keys().map(modulePath => {
  return modulesFiles(modulePath);
}, {});
console.log(modules);
export default modules;
