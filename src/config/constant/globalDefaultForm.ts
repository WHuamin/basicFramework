// 设置表单默认值
// 表单 - 属性
export const DefaultFormAttrs = {
  type: 'form',
  size: 'small',
  labelSuffix: '：',
  labelPosition: 'right',
  disabled: false,
  // buttonList: [
  //   {
  //     command: 'reset',
  //     show: true,
  //     text: '重置',
  //   },
  //   {
  //     command: 'submit',
  //     show: true,
  //     type: 'primary',
  //     text: '提交',
  //   },
  // ],
};

export const DefaultTextInputAttrs = (label: string = '') => ({
  type: 'text',
  placeholder: '请输入' + label,
  clearable: true,
});
interface InputDefaultConfig {
  type: string;
  placeholder?: string;
  autosize?: any;
  options?: IForm.IFieldOptions;
  clearable?: boolean;
  isCheckAll?: boolean;
  showCheckAll?: boolean;
  checkAllText?: string;
}
// 优雅解决typescript报错：“元素隐式具有 “any“ 类型，因为类型为 “string“ 的表达式不能用于索引类型”，解决方案：定义一个string作为key的类型
type stringKey = Record<string, InputDefaultConfig>;

export function defaultInputAttrs(type: string = 'text', label: string = '') {
  const defaultConfig: stringKey = {
    text: {
      type: 'text',
      placeholder: '请输入' + label,
      clearable: true,
    },
    textarea: {
      type: 'textarea',
      placeholder: '请输入' + label,
      clearable: true,
      autosize: { minRows: 4 },
    },
    radio: {
      type: 'radio',
      placeholder: '请选择' + label,
      clearable: true,
    },
    radioOption: {
      type: 'radio',
      options: {
        valueKey: 'value',
        labelKey: 'label',
        data: [],
      },
    },
    checkbox: {
      type: 'checkbox',
      placeholder: '请选择' + label,
      clearable: false,
      isCheckAll: false,
      showCheckAll: false,
      checkAllText: '全选',
    },
    checkboxOption: {
      type: 'checkbox',
      options: {
        valueKey: 'value',
        labelKey: 'label',
        data: [],
      },
    },
    select: {
      type: 'checkbox',
      placeholder: '请选择' + label,
      clearable: false,
    },
    selectOption: {
      type: 'checkbox',
      options: {
        valueKey: 'value',
        labelKey: 'label',
        data: [],
      },
    },
  };
  return defaultConfig[type] || {};
}
