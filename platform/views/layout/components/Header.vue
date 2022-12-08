<template>
  <el-row :gutter="5" class="header">
    <el-col :span="2">
      <el-button :icon="collapseMenuIcon" plain class="menu-btn"
        @click="SET_MENU_COLLAPSE(!isCollapseMenu)"></el-button>
    </el-col>
    <el-col :span="19">
      <h1 class="header-title">{{ systemName }}</h1>
    </el-col>
    <el-col :span="3" class="header-right">
      <el-dropdown>
        <div class="dropdown-title">
          <el-avatar size="medium" :src="userInfo.avatarUrl"></el-avatar>
          <span>{{ userInfo.userName }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-circle-plus">个人信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-plus">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'LayoutHeader',
  props: {
    isCollapseMenu: { type: Boolean, default: false },
    systemName: { type: String, defalut: '' },
    userInfo: { type: Object, default: () => ({}) }
  },
  data () {
    return { avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' }
  },
  computed: {
    collapseMenuIcon () {
      return this.isCollapseMenu ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  },
  methods: {
    ...mapMutations('system', ['SET_MENU_COLLAPSE'])
    // changeMenuCollapseStatus () {
    //   this.SET_MENU_COLLAPSE(!this.isCollapseMenu)
    // }
  }
}
</script>
<style lang="scss" scoped>
.header {
  @include wrapper(0);
  @include flex-wrapper(row);

  &-title {
    font-size: $text-size-h1
  }

  &-right {
    text-align: right;
  }
}

.menu-btn {
  padding: 5px 10px;
  font-size: 24px;
  border-radius: 4px;
}

.dropdown-title {
  @include flex-wrapper(row, space-around, center);

  &>* {
    margin-left: 10px;
  }
}
</style>
