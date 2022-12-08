<template>
  <router-view></router-view>
</template>
<script>
export default {
  name: 'platformApp'
}
</script>

<style lang="scss">
// @import url(../globalSrc/css/reset.scss);

html,
body {
  @include wrapper(0)
}
</style>
