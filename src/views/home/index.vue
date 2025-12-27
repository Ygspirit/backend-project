<template>
  <h1>home</h1>
</template>

<script setup lang="ts">
defineOptions({ name: 'Home' });
import { onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
onMounted(() => {
  console.log('用户信息', userStore.userInfo());
});
</script>

<style scoped></style>
