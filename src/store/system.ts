import { defineStore } from 'pinia';
import { useUserStore } from './user';

// defineStore 第一个参数是id，必需且值唯一
export const useSystemStore = defineStore('system', {
  //state返回一个函数，防止作用域污染
  state: () => {
    return {
      companyInfo: {
        name: 'zhangsan',
      },
      systemInfo: {},
    };
  },
  getters: {
    newName: (state) => state.companyInfo.name + '有限公司',
  },
  actions: {
    updateCompanyName() {
      const userStore = useUserStore(); // 引用其他store
      if (userStore.userInfo.name !== 'zhangsan') this.companyInfo.name = userStore.userInfo.companyName;
    },
  },
  // 开始数据持久化
  persist: {
    key: 'storekey', // 修改存储的键名，默认为当前 Store 的 id
    storage: window.sessionStorage, // 存储位置修改为 sessionStorage
  },
});
