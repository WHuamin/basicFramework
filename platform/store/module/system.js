// 系统
import website from '@platform/config/website'
export default {
  namespaced: true,
  state: {
    website,
    isCollapseMenu: false // 是否收起菜单
  },
  mutations: {
    // 修改菜单栏收起状态
    SET_MENU_COLLAPSE (state, payload) {
      state.isCollapseMenu = payload || false
    }
  }
}
