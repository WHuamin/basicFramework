<template>
  <template v-if="_inputAttrs.showCheckAll">
    <el-checkbox
      v-model="checkAll"
      class="checkbox-margin"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      {{ _inputAttrs.checkAllText }}
    </el-checkbox>
  </template>
  <el-checkbox-group v-model="checkedValue" @change="handleCheckedSingleChange">
    <el-checkbox v-for="optItem in _optionItems" :key="optItem.value" :label="optItem.label">
      {{ optItem.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts" setup>
import { defineProps, ref, ComputedRef, computed } from 'vue';
import { defaultInputAttrs } from '@/config/constant/globalDefaultForm';

// const props = defineProps<IForm.FormSelectionProps>();
// const emits = defineEmits<IForm.InputEmitEvents>();
const props = defineProps<{
  activeValue: string[]; //当前值
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

// 复选框所有选项的总个数
const allCheckboxCount: number = _optionItems.value.length;
// 复选框所有选项的value集合
const allCheckboxValues: ComputedRef<string[]> = computed(() => {
  return _optionItems.value.map((item: any) => item.value);
});

// 选中的值
const checkedValue = ref<string[]>(props.activeValue || (_inputAttrs.value.isCheckAll ? allCheckboxValues : []));

// 是否全选
const checkAll = ref<boolean>(checkedValue.value.length > 0 && checkedValue.value.length == allCheckboxCount);

// 中间状态
const isIndeterminate: ComputedRef<boolean> = computed(() => {
  const checkedValueCount = checkedValue.value.length;
  return checkedValueCount > 0 && checkedValueCount < allCheckboxCount;
});

const handleCheckAllChange = (val: boolean) => {
  checkedValue.value = val ? allCheckboxValues.value : [];
  emits('update:activeValue', checkedValue.value);
};
const handleCheckedSingleChange = (value: string[]) => {
  checkedValue.value = value;
  checkAll.value = value.length === allCheckboxCount;
  emits('update:activeValue', value);
};
</script>

<style scoped>
.checkbox-margin {
  margin-right: 30px;
}
</style>
