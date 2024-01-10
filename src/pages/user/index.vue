<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
// import commonApis from '@/api/common';
import userApis from '@/api/user';

const userStore = useUserStore();
//storeToRefs 会跳过所有的 action 属性
const { userInfo, token, newName } = storeToRefs(userStore);

//action 属性直接解构
const { updateUserInfo, updateAge, updateToken } = userStore;

const handleUser = () => {
  updateUserInfo({ name: 'lisi', age: 24 });
};

const handleAge = () => {
  //userInfo 是一个ref响应式引用，需通过.value取值
  updateAge(userInfo.value.age + 1);
};

const handleToken = () => {
  updateToken('23234');
};

const test = ref('');
// commonApis
//   .logout()
//   .then((res) => {
//     // console.log('结果', res);
//     test.value = res.sodar_query_id;
//   })
//   .catch((err) => {
//     // console.log(err);
//     test.value = err;
//   });
onMounted(() => {
  userApis
    .userList({
      account: '123',
      password: '1233',
    })
    .then((res) => {
      // console.log('结果', res);
      test.value = res;
    })
    .catch((err) => {
      test.value = err;
      // console.log('结果err', err);
    });
});
</script>

<template>
  <div>user</div>
  <div>姓名：{{ userInfo.name }} 年龄：{{ userInfo.age }}</div>
  <div>token：{{ token }}</div>
  <div>getter值：{{ newName }}</div>
  <button @click="handleUser">更新用户</button>
  <button @click="handleAge">更新年龄</button>
  <button @click="handleToken">更新token</button>
</template>

<style scoped></style>
