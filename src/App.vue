<template>
  <!-- router-view 将显示与 url 对应的组件 -->
  <router-view v-slot="{ Component }">
    <!-- Transition 是基于路由的动态过渡动效 -->
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { manageRoute } from '@/router/routes';

const router = useRouter();
const route = useRoute();
watch(route, async (newVal) => {
  const role = localStorage.getItem('role');
  if (role && role === 'admin') {
    router.addRoute('Home', manageRoute);
    /* 防止页面刷新，路由丢失 */
    if (newVal.fullPath === '/home/manage') {
      await router.replace('/home/manage');
    }
  }
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
