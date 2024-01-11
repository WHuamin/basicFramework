<template>
  <!-- 输入框 -->
  <el-input
    v-model="inputModel"
    v-bind="_inputAttrs"
    @change="changeValue"
    @keyup.enter="handleKeyUp(_inputAttrs.enterable)"
  />
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, ref, ComputedRef, computed } from 'vue';
import { defaultInputAttrs } from '@/config/constant/globalDefaultForm';
// const props = defineProps<IForm.FormInputProps>();
// const emits = defineEmits<IForm.InputEmitEvents>();
const props = defineProps<{
  inputAttrs: IForm.InputAttrs;
  activeValue: string | any;
}>();

const emits = defineEmits<{
  (e: 'update:activeValue', params: any): void;
}>();

// 设置 input 属性
const _inputAttrs: ComputedRef<IForm.InputAttrs> = computed(() => {
  return Object.assign(defaultInputAttrs(props.inputAttrs.type, props.inputAttrs.label), props.inputAttrs);
});

// 输入框的数据
const inputModel = ref<string | any>(props.activeValue);

const changeValue = (): void => {
  emits('update:activeValue', inputModel.value);
};

// 输入框回车事件
const handleKeyUp = (enterable: boolean | undefined) => {
  if (!enterable) return;
  emits('update:activeValue', inputModel.value);
};
</script>
