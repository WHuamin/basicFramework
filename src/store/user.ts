import { defineStore } from 'pinia';

// defineStore 第一个参数是id，必需且值唯一
export const useUserStore = defineStore('user', {
  //state返回一个函数，防止作用域污染
  state: () => {
    return {
      userInfo: {
        name: 'zhangsan',
        age: 23,
        companyName: 'xxx集团',
      },
      token: 'S1',
      list: [] as number[],
    };
  },
  getters: {
    newName: (state) => state.userInfo.name + 'vip',
  },
  actions: {
    //更新整个对象 - 同步
    updateUserInfo(userInfo: { name: string; age: number; companyName: string }) {
      this.userInfo = userInfo;
    },
    //更新对象中某个属性 - 同步
    updateAge(age: number) {
      this.userInfo.age = age;
    },
    //更新基础数据类型 - 同步
    updateToken(token: string) {
      this.token = token;
    },
    // action - 异步
    async updateList() {
      try {
        const data = await getData();
        this.list.push(data);
      } catch {
        /* empty */
      }
    },
  },
  // 开始数据持久化
  //   persist: true,
  persist: {
    key: 'storekey', // 修改存储的键名，默认为当前 Store 的 id
    storage: window.sessionStorage, // 存储位置修改为 sessionStorage
  },
});

const getData = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.random() * 100);
    }, 200);
  });
};
