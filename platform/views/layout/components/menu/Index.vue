<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="transparent" text-color="#fff"
      active-text-color="#409EFF" :collapse="isCollapseMenu">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template> -->
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <!-- </el-menu-item-group> -->
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>
<script>
export default {
  name: 'LayoutMenu',
  props: {
    isCollapseMenu: { type: Boolean, default: false }
  }
}
</script>
<style lang="scss" scoped>
.el-scrollbar {
  @include wrapper(0, calc(100% - $header-height));
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .el-menu {
  border-right-color: transparent;
}
::v-deep .el-submenu [class^=el-icon-]{
  font-size: 24px;
}
</style>
