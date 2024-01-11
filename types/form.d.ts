import { type FormItemRule } from 'element-plus';

export = IForm;

export as namespace IForm;

declare namespace IForm {
  // 输入框 类型
  type InputType = 'password' | 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'isSlot';

  // 按钮 类型
  type ButtonType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text';

  // 当 FiledItem 的type === 'radio' | 'checkbox'时，options的参数类型
  interface IFieldOptions {
    labelKey?: string; // 选项 label 的 key
    valueKey?: string; // 选项 value 的 key
    isCheckAll?: boolean; // 是否全选 当 FiledItem 的type === 'checkbox'时
    showCheckAll?: boolean; // 是否显示全选 当 FiledItem 的type === 'checkbox'时
    checkAllText?: string; // 全选默认显示的文本内容 当 FiledItem 的type === 'checkbox'时
    data: Record<string, any>[];
  }

  // 输入框 属性
  export interface InputAttrs {
    label?: string; // 标签文本
    field: string; // model 的键名
    type: InputType; // 当前 fieldItem 的类型
    defaultValue?: any; // 默认显示的值
    placeholder?: string; // 输入框占位文本
    disabled?: boolean; // 是否禁用
    readonly?: boolean;
    clearable?: boolean; // 是否可清空
    showPassword?: boolean; // 是否显示切换密码图标
    enterable?: boolean; // 当为输入框时，是否启用回车触发提交功能
    fieldAttrs?: FormField;
    autosize?: any;
    optionConfig?: IFieldOptions;
    showCheckAll?: boolean; // 是否显示全选选项
    isCheckAll?: boolean; // 是否全选
    checkAllText?: string;
  }

  // 表单 item 属性
  export interface FormField {
    label?: string;
    labelWidth?: string | number; // 标签的长度，
    field?: string;
    rules?: FormItemRule[]; // 表单验证规则。格式参考element-plus form 表单 或者参数类型声明
  }

  //   表单 item 属性 和 input 合并
  //   export interface FormFieldInput extends FormField, InputAttrs {}
  export interface FormFieldItem {
    fieldAttrs: FormField;
    inputAttrs: InputAttrs;
    optionConfig?: IFieldOptions;
  }

  // 表单属性
  export interface FormAttrs {
    labelWidth?: string | number; // 标签的长度，
    labelSuffix?: string;
    labelPosition?: 'left' | 'right' | 'top'; // 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性
    disabled?: boolean; // 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性。
    size?: 'large' | 'small' | 'default'; // 用于控制该表单内组件的尺寸
    buttonList?: FormButtonAttrs[];
    customButtonClass?: string; // 自定义表单底部按钮容器样式class
  }
  // 表单按钮
  export interface FormButtonAttrs {
    command: string;
    type?: ButtonType;
    show?: boolean; // 是否展示按钮
    text?: string; // 按钮默认显示的文本内容
    needValid?: boolean; // 是否需要表单校验
  }

  // 表单 - props
  export interface FormProps {
    fieldList: InputAttrs[];
    formAttrs?: FormAttrs;
    formModel?: Record<InputAttrs['field'], InputAttrs['defaultValue']>;
  }

  // 表单 - 回调
  export interface FormEmitEvents {
    (e: 'command', buttonInfo: any, params: any): void;
    // (e: 'submit', params: any): void;
    // (e: 'reset'): void;
    // (e: 'cancel'): void;
  }
  // 输入框 组件 props
  export interface FormInputProps {
    inputAttrs: IForm.InputAttrs;
    activeValue: string | any;
  }
  // 选择框 组件 props
  export interface FormSelectionProps {
    activeValue: any; //当前值
    inputAttrs: InputAttrs;
    optionConfig?: IFieldOptions; // 格式参考 fieldItem options 配置项
  }
  // 输入框 - 回调
  export interface InputEmitEvents {
    (e: 'update:activeValue', params: any): void;
  }
}
