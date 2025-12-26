<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.folded ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
defineOptions({ name: 'Breadcrumb' });
import { useLayoutSettingStore } from '@/store/modules/setting';
let layoutSettingStore = useLayoutSettingStore();
const changeIcon = () => {
  layoutSettingStore.folded = !layoutSettingStore.folded;
};
</script>

<style scoped></style>
