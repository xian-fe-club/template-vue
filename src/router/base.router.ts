/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-27 14:40:59
 * @LastEditTime: 2021-03-26 16:41:48
 * @LastEditors: Please set LastEditors
 */
const modulesFiles = require.context("./modules", true, /\.json$/);
const modules = modulesFiles.keys().map(modulePath => {
  return modulesFiles(modulePath);
}, {});
export default modules;
