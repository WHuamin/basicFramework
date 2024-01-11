<template>
  <!-- router-view 将显示与 url 对应的组件 -->
  <router-view v-slot="{ Component }">
    <!-- Transition 是基于路由的动态过渡动效 -->
    <Transition name="fade" mode="out-in">
      <!-- <Transition>中的组件不能呈现动画的非元素根节点。 也就是说，Transition包裹的必须是一个单根的组件。所以要包裹一个div -->
      <div :key="$route.path">
        <component :is="Component" />
      </div>
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import manageRoutes from '@/router/modules/manage';

const router = useRouter();
const route = useRoute();
watch(route, async (newVal) => {
  const role = localStorage.getItem('role');
  if (role && role === 'admin') {
    router.addRoute('Home', manageRoutes[0]);
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
