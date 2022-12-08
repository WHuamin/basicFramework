<template>
  <el-image class="logo" :src="logo" fit="contain"></el-image>
</template>
<script>
export default {
  name: 'LayoutLogo',
  props: {
    logo: {
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
  box-sizing: border-box;
  @include wrapper($box-space-small, $header-height)
}
</style>
