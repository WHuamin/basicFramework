<template>
  <div>home</div>
  <router-view v-slot="{ Component }">
    <!-- <Transition>中的组件不能呈现动画的非元素根节点。 也就是说，Transition包裹的必须是一个单根的组件。所以要包裹一个div -->
    <Transition name="fade" mode="out-in">
      <div :key="$route.path">
        <component :is="Component" />
      </div>
    </Transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style scoped></style>
