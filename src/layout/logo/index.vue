<template>
  <div class="logo_container">
    <img :src="setting.logoImg" alt="" />
    <h1>{{ setting.title }}</h1>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Logo' });
import setting from '@/setting';
</script>

<style scoped lang="scss">
.logo_container {
  display: flex;
  align-items: center;
  height: $base-menu-logo-height;
  padding: 10px 0px 0px 10px;
  img {
    width: 40px;
    margin-right: 10px;
  }
  h1 {
    color: white;
    font-size: $base-logo-title-fontSize;
  }
}
</style>
