<template>
  <el-form ref="basicFormRef" :model="basicFormModel" v-bind="_formAttrs" @submit.prevent>
    <el-form-item
      v-for="(item, index) in formFieldList"
      :key="index"
      :label="item.fieldAttrs.label"
      :prop="item.fieldAttrs.field"
      :rules="item.fieldAttrs.rules"
      v-bind="item.fieldAttrs"
    >
      <template v-if="item.inputAttrs.type == 'radio'">
        <basic-radio-group
          v-model:activeValue="basicFormModel[item.inputAttrs.field]"
          :input-attrs="item.inputAttrs"
          :option-config="item.optionConfig"
        ></basic-radio-group>
      </template>
      <template v-else-if="item.inputAttrs.type == 'checkbox'">
        <basic-checkbox-group
          v-model:activeValue="basicFormModel[item.inputAttrs.field]"
          :input-attrs="item.inputAttrs"
          :option-config="item.optionConfig"
        ></basic-checkbox-group>
      </template>
      <template v-else-if="item.inputAttrs.type == 'select'">
        <basic-select
          v-model:activeValue="basicFormModel[item.inputAttrs.field]"
          :input-attrs="item.inputAttrs"
          :option-config="item.optionConfig"
        ></basic-select>
      </template>
      <template v-else-if="['text', 'textarea'].includes(item.inputAttrs.type)">
        <basic-text-input
          v-model:activeValue="basicFormModel[item.inputAttrs.field]"
          :input-attrs="item.inputAttrs"
        ></basic-text-input>
      </template>
      <template v-else-if="item.inputAttrs.type == 'isSlot'">
        <slot
          :name="item.fieldAttrs.field"
          :input-attrs="item.inputAttrs"
          :active-value="basicFormModel[item.inputAttrs.field]"
        ></slot>
      </template>
    </el-form-item>
    <div v-show="_formButtons.length" class="basic-form-footer" :class="_formAttrs.customButtonClass">
      <slot name="buttons" :model="basicFormModel" :form-ref="basicFormRef">
        <template v-for="(btnItem, btnIndex) in _formButtons" :key="btnItem.command">
          <el-button
            v-show="btnItem.show"
            :type="btnItem.type"
            @click="handleCommandBtn(btnItem, btnIndex, basicFormRef)"
          >
            {{ btnItem.text }}
          </el-button>
        </template>
      </slot>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, computed, ComputedRef, defineProps, defineEmits, watch } from 'vue';
import type { FormInstance } from 'element-plus';
import { DefaultFormAttrs } from '@/config/constant/globalDefaultForm';

const basicFormRef = ref<FormInstance>();
const basicFormModel = ref<Record<string, any>>({});
// const props = defineProps<IForm.FormProps>();
// const emits = defineEmits<IForm.FormEmitEvents>();
const props = defineProps<{
  fieldList: IForm.InputAttrs[];
  formAttrs?: IForm.FormAttrs;
  formModel?: Record<IForm.InputAttrs['field'], IForm.InputAttrs['defaultValue']>;
}>();

const emits = defineEmits<{
  (e: 'command', buttonInfo: any, params: any): void;
}>();

const _formAttrs: ComputedRef<IForm.FormAttrs> = computed(() => {
  return Object.assign({}, DefaultFormAttrs, props?.formAttrs || {});
});

const _formButtons: ComputedRef<IForm.FormButtonAttrs[]> = computed(() => {
  return props?.formAttrs?.buttonList || [];
});

const formFieldList: ComputedRef<IForm.FormFieldItem[]> = computed(() => {
  return props.fieldList.map((item: IForm.InputAttrs): IForm.FormFieldItem => {
    const { fieldAttrs = {}, optionConfig = {}, ...inputAttrs } = item;
    const _fieldAttrs: IForm.FormField = {
      ...fieldAttrs,
      field: inputAttrs.field,
    };
    const _optionConfig: IForm.IFieldOptions = {
      data: [],
      ...optionConfig,
    };
    const _inputAttrs: IForm.InputAttrs = {
      ...inputAttrs,
      label: fieldAttrs?.label || '',
    };
    return {
      fieldAttrs: _fieldAttrs,
      optionConfig: _optionConfig,
      inputAttrs: _inputAttrs,
    };
  });
});

/**
 * 根据fieldList初始化model，
 * 如果formModel有传值就用传递的model数据模型，
 * 否则就给上面声明的formModel设置相应的(key,value) [item.field]，
 * item.value是表单的默认值（选填）
 */
watch(
  // 监听 props 对象中的 formModel 属性
  () => props.formModel,
  () => {
    formFieldList.value.map((item: IForm.FormFieldItem) => {
      // 如果类型为checkbox，默认值需要设置一个空数组
      const value = item.inputAttrs.type === 'checkbox' ? [] : '';
      props.formModel
        ? (basicFormModel.value = props.formModel)
        : (basicFormModel.value[item.inputAttrs.field] = item.inputAttrs.defaultValue || value);
    });
  },
  { immediate: true },
);

const handleCommandBtn = async (buttonData: IForm.FormButtonAttrs, index: number, formEl: FormInstance | undefined) => {
  const btnData = {
    index,
    command: buttonData.command,
  };
  if (buttonData.command == 'reset') {
    if (!formEl) return;
    formEl.resetFields();
  } else if (buttonData?.needValid) {
    if (!formEl) return;
    const valid = await formEl.validate();
    if (!valid) return;
  }
  emits('command', btnData, basicFormModel);
};
</script>

<style scoped>
.basic-form-footer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
