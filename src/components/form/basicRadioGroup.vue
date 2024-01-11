<template>
  <!-- 单选框 -->
  <el-radio-group v-model="inputModel" v-bind="_inputAttrs" @change="changeValue">
    <template v-if="_optionItems.length">
      <el-radio v-for="optItem in _optionItems" :key="optItem.value" :label="optItem.label">
        {{ optItem.label }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { defineProps, ref, ComputedRef, computed } from 'vue';
import { defaultInputAttrs } from '@/config/constant/globalDefaultForm';

// const props = defineProps<IForm.FormSelectionProps>();
// const emits = defineEmits<IForm.InputEmitEvents>();
const props = defineProps<{
  activeValue: any; //当前值
  inputAttrs: IForm.InputAttrs;
  optionConfig: IForm.IFieldOptions; // 格式参考 fieldItem options 配置项
}>();

const emits = defineEmits<{
  (e: 'update:activeValue', params: any): void;
}>();

// 设置 input 属性
const _inputAttrs: ComputedRef<IForm.InputAttrs> = computed(() => {
  const option = defaultInputAttrs(props.inputAttrs.type, props.inputAttrs.label);
  return Object.assign(option, props.inputAttrs);
});

// 设置 option 属性
const _optionItems: ComputedRef<Record<string, any>[]> = computed(() => {
  const selectionboxOption = defaultInputAttrs(`${props.inputAttrs.type}Option`);
  const res = Object.assign({}, selectionboxOption.options || {}, props.optionConfig);
  return res.data.map((item) => ({
    label: item[res.labelKey || 'label'],
    value: item[res.valueKey || 'value'],
  }));
});

// 输入框的数据
const inputModel = ref<string | any>(props.activeValue);

const changeValue = (): void => {
  emits('update:activeValue', inputModel.value);
};
</script>
