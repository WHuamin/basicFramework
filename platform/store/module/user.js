// 用户
export default {
  namespaced: true,
  state: {
    userName: '用户',
    roles: [],
    avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' // 头像
  },
  mutations: {
    // 修改菜单栏收起状态
    SET_MENU_COLLAPSE (state, payload) {
      state.isCollapseMenu = payload || false
    }
  }
}
