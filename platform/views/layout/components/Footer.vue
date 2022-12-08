<template>
  <div class="footer">
    <span>{{ copyright }}</span>
    <router-link to="">《平台隐私政策》</router-link>
  </div>
</template>
<script>
export default {
  name: 'LayoutFooter',
  props: {
    copyright: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  text-align: center;
}

a,
span {
  @include text($text-size-small, 16px, $text-color-white, center, $text-color-primary, pointer);
}
</style>
