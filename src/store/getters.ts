const getters = {
  token: (state: Record<string, any>) => state.user.token,
  avatar: (state: Record<string, any>) => state.user.avatar,
  name: (state: Record<string, any>) => state.user.name,
  // 后台返回权限集合
  roles: (state: Record<string, any>) => state.user.roles,
  // 存在权限集合
  route: (state: Record<string, any>) => state.permission.route,
  isPermission: (state: Record<string, any>) => state.permission.isPermission
};
export default getters;
