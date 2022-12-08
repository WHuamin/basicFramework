<template>
  <el-form ref="basicForm" :model="form" :rules="formRules" label-width="120px" class="basic-form" v-bind="$attrs">
    <el-form-item v-for="(item, index) in formItems" :key="index" :name="item.prop" :prop="item.prop"
      :label="item.label">
      <!-- 自定义 -->
      <slot v-if="item.isSlot" :data="item" :form="form" :name="item.prop"></slot>

      <!-- 下拉框 -->
      <template v-else-if="item.type == 'select'">
        <el-select v-model="form[item.prop]" v-bind="item">
          <template v-if="item.options">
            <el-option v-for="op in item.options" :key="op.value" v-bind="op"></el-option>
          </template>
        </el-select>
      </template>

      <!-- 单选 -->
      <template v-else-if="item.type == 'radio'">
        <el-select v-model="form[item.prop]" v-bind="item">
          <template v-if="item.options">
            <el-option v-for="op in item.options" :key="op.value" v-bind="op"></el-option>
          </template>
        </el-select>
        <el-radio-group v-model="form[item.prop]" v-bind="item">
          <el-radio v-for="op in item.options" :key="op.value" :label="op.value">{{ op.label }}</el-radio>
        </el-radio-group>
      </template>

      <!-- 多选 -->
      <template v-else-if="item.type == 'checkbox'">
        <el-checkbox-group v-model="form[item.prop]" v-bind="item">
          <el-checkbox v-for="op in item.options" :key="op.value" :label="op.value">{{ op.label }}</el-checkbox>
        </el-checkbox-group>
      </template>

      <!-- 文本 -->
      <el-input v-else v-bind="item" v-model="form[item.prop]"></el-input>

    </el-form-item>

    <slot></slot>

    <div class="form-footer">
      <slot name="leftNav"></slot>
      <el-button type="primary" @click="submitForm">{{ submitBtnText }}</el-button>
      <slot name="rightNav"></slot>
    </div>
  </el-form>
</template>
<script>
export default {
  name: 'BasicForm',
  props: {
    /**
     * form表单配置
     * {
        prop: '',
        label: '',
        value: '值',
        type: '输入框类型',
        'prefix-icon': 'el-icon-search', // 可以是el-input、el-select等等的任何属性
        clearable: true,
        rules: { // 配置表单的校验规则
          required: true, // 如果为true，则默认需要表单校验，校验的类型是根据trigger去处理，补充的校验在result中写
          trigger: 'blur',
          list: []
        }
      }
     */
    formConfig: {
      type: Array,
      default: () => []
    },
    // 确定按钮文字
    submitBtnText: {
      type: String,
      defalut: '确 定'
    },
    // 是否隐藏label
    hiddenLabel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {},
      formRules: {},
      isValidate: false,
      formItems: []
    }
  },
  watch: {
    formConfig: {
      handler (val) {
        if (!val.length) return false
        const basicForm = {}; const basicRules = {}; const formItems = []; let isValidate = false

        val.forEach(({ rules = {}, ...item }) => {
          basicForm[item.prop] = item?.value ?? ''
          if (Object.keys(rules).length) {
            isValidate = true
            if (rules?.list) {
              basicRules[item.prop] = this.writeRules([{ trigger: rules.trigger, message: item.label }, ...rules.list])
            } else {
              basicRules[item.prop] = this.writeRules([{ trigger: rules.trigger, message: item.label }])
            }
          }
          item.placeholder = item.placeholder || this.handlePlaceholder(rules.trigger, item.label)
          formItems.push(item)
        })
        this.form = basicForm
        this.formRules = basicRules
        this.isValidate = isValidate
        this.formItems = formItems
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handlePlaceholder (type, msg) {
      const allMessage = {
        blur: '请输入',
        change: '请选择'
      }
      return `${allMessage[type] || ''}${msg}`
    },
    // 处理 form 表单的校验
    writeRules (rules = []) {
      if (!rules || !rules.length) return []
      return rules.map(({ trigger, message, ...item }) => ({
        required: true,
        trigger: 'change',
        message: this.handlePlaceholder(trigger, message),
        ...item
      }))
    },
    submitForm () {
      this.isValidate && this.$refs.basicForm.validate((valid) => {
        if (!valid) return false
        this.$emit('submit', { ...this.form })
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.form-footer {
  @include flex-wrapper(row, center)
}
</style>
