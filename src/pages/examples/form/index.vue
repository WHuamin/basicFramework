<template>
  <div>form</div>
  <basic-form :field-list="fieldList" :form-attrs="formAttrs" @command="handleFormCommand"></basic-form>
</template>

<script setup lang="ts">
import basicForm from '@/components/form/basicForm.vue';
const fieldList: IForm.InputAttrs[] = [
  {
    fieldAttrs: {
      label: '账号',
      labelWidth: '120px',
    },
    type: 'text',
    field: 'account',
    defaultValue: '默认数据123',
  },
  {
    fieldAttrs: {
      label: '密码',
      labelWidth: '120px',
    },
    field: 'password',
    type: 'text',
    defaultValue: '',
    placeholder: '请输入密码， 长度8 - 12',
    clearable: true,
    showPassword: true,
    enterable: true,
  },

  {
    field: 'loginWay',
    type: 'radio',
    defaultValue: '',
    fieldAttrs: {
      label: '登录方式',
      labelWidth: '120px',
    },
    optionConfig: {
      data: [
        { label: 'WEB端', value: 'web' },
        { label: 'APP端', value: 'app' },
      ],
    },
  },
  {
    field: 'loginWay1',
    type: 'radio',
    defaultValue: 'app',
    fieldAttrs: {
      label: '登录方式1',
      labelWidth: '120px',
    },
    optionConfig: {
      labelKey: 'label1',
      valueKey: 'value1',
      data: [
        { label1: 'WEB端', value1: 'web' },
        { label1: 'APP端', value1: 'app' },
      ],
    },
  },
  {
    field: 'loginWay2',
    type: 'checkbox',
    showCheckAll: true,
    // defaultValue: ['app', 'web', 'ios'],
    defaultValue: [],
    fieldAttrs: {
      label: '登录方式多选',
      labelWidth: '120px',
    },
    optionConfig: {
      labelKey: 'label1',
      valueKey: 'value1',
      data: [
        { label1: 'WEB端', value1: 'web' },
        { label1: 'APP端', value1: 'app' },
        { label1: 'IOS端', value1: 'ios' },
      ],
    },
  },
  {
    field: 'loginWay3',
    type: 'select',
    defaultValue: 'web',
    fieldAttrs: {
      label: '登录方式3',
      labelWidth: '120px',
    },
    optionConfig: {
      data: [
        { label: 'WEB端', value: 'web' },
        { label: 'APP端', value: 'app' },
      ],
    },
  },
  {
    fieldAttrs: {
      label: '备注',
      labelWidth: '120px',
    },
    field: 'mask',
    type: 'textarea',
    defaultValue: '',
    autosize: { minRows: 2 },
  },
];
const formAttrs: IForm.FormAttrs = {
  buttonList: [
    {
      command: 'reset',
      show: true,
      text: '重置',
    },
    {
      command: 'submit',
      show: true,
      type: 'primary',
      text: '提交',
    },
  ],
  customButtonClass: 'test',
};
const res = ref({
  btnInfo: {},
  formModel: {},
});
const handleFormCommand = (btnInfo: any, formModel: any) => {
  res.value = {
    btnInfo,
    formModel,
  };
};
</script>

<style scoped>
::v-deep .test {
  padding: 20px;
}
</style>
