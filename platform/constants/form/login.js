export const loginForm = [{
  prop: 'account',
  label: '账号',
  value: '',
  placeholder: '请输入账号',
  type: 'text',
  'prefix-icon': 'el-icon-s-custom',
  isSlot: true,
  clearable: true,
  rules: {
    required: true, // 如果为true，则默认需要表单校验，校验的类型是根据trigger去处理，补充的校验在result中写
    trigger: 'blur',
    list: []
  }
},
{
  prop: 'password',
  label: '密码',
  value: '',
  type: 'password',
  'prefix-icon': 'el-icon-search',
  clearable: true,
  rules: {
    required: true, // 如果为true，则默认需要表单校验，校验的类型是根据trigger去处理，补充的校验在result中写
    trigger: 'blur',
    list: []
  }
},
{
  prop: 'idCard',
  label: '身份验证',
  value: [],
  type: 'checkbox', // select,radio
  clearable: true,
  rules: {
    required: true, // 如果为true，则默认需要表单校验，校验的类型是根据trigger去处理，补充的校验在result中写
    trigger: 'change'
  },
  options: [{ // 如果选项是个请求，如何处理
    label: 'label01',
    value: 'value01'
  }, {
    label: 'label02',
    value: 'value02'
  }]
}]
