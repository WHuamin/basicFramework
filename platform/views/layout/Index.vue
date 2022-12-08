<template>
  <el-container class="layout-container">
    <el-aside class="layout-aside" :class="{ 'collapse-aside': isCollapseMenu }">
      <logo logo="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
      <layout-menu :isCollapseMenu="isCollapseMenu" />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <layout-header :isCollapseMenu="isCollapseMenu" :system-name="systemName" :user-info="basicUserInfo" />
      </el-header>
      <el-main>
        <transition name="el-fade-in-linear">
          <router-view></router-view>
        </transition>
      </el-main>
      <el-footer class="layout-footer">
        <layout-footer :copyright="copyright" />
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from './components/Logo.vue'
import LayoutMenu from './components/menu/Index.vue'
import LayoutHeader from './components/Header.vue'
import LayoutFooter from './components/Footer.vue'
export default {
  name: 'platformLayout',
  components: { Logo, LayoutMenu, LayoutHeader, LayoutFooter },
  computed: {
    ...mapGetters(['isCollapseMenu', 'copyright', 'systemName', 'basicUserInfo'])
  }
}
</script>
<style lang="scss">
.layout {
  &-container {
    @include wrapper(0)
  }

  &-aside {
    width: $aside-width !important;
    background-color: $bg-mian;
    overflow: hidden !important;
    transition: width 0.2s;
  }

  &-header {
    height: $header-height !important;
    border-bottom: solid 1px $border-color-normal;
  }

  &-footer {
    height: $footer-height !important;
    background-color: $bg-mian;
  }
}

.collapse-aside {
  width: 70px !important;
}
</style>
