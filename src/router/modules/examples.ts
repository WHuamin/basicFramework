export default [
  // 基础组件
  {
    path: '/form',
    name: 'formExample',
    component: () => import('@/pages/examples/form/index.vue'),
  },
  // vue3 语法
  {
    path: '/syntax',
    name: 'syntaxExample',
    component: () => import('@/pages/examples/syntax/index.vue'),
  },
];
