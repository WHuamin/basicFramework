<template>
  <div class="login">
    <el-card class="box-card">
      <basic-form :form-config="loginForm" lable-width="0px" hide-required-asterisk submit-btn-text="登 录"
        @submit="submitForm">
        <template #account="{ data, form }">
          <el-input v-bind="data" v-model="form[data.prop]"></el-input>
        </template>
      </basic-form>
    </el-card>
  </div>
</template>
<script>
import { loginForm } from '@platform/constants/form/login'
export default {
  name: 'platFormLogin',
  data () {
    return {
      loginForm
    }
  },
  methods: {
    submitForm (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  @include wrapper;
  @include flex-wrapper(row, center)
}
</style>
