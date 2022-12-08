export default {
  // 菜单栏收起状态
  isCollapseMenu: state => state.system.isCollapseMenu,
  // 系统版权
  copyright: state => {
    const { copyright, companyName } = state.system.website
    return `Copyright © ${copyright} ${companyName}`
  },
  // 系统名称
  systemName: state => {
    const { companyName, systemName } = state.system.website
    return companyName + systemName
  },
  // 用户基本信息
  basicUserInfo: state => {
    const userState = state.user
    return {
      userName: userState.userName,
      avatarUrl: userState.avatarUrl
    }
  }
}
