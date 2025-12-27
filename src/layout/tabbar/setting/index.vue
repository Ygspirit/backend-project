<template>
  <el-button size="small" @click="updateRefsh" icon="Refresh" circle></el-button>
  <el-button size="small" @click="" icon="FullScreen" circle></el-button>
  <el-button size="small" @click="" icon="Setting" circle></el-button>
  <img src="../../../../public/logo.png" style="width: 24px; height: 24px; margin: 0 10px" />
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
defineOptions({ name: 'Setting' });
// 获取layout配置相关的仓库
import { useLayoutSettingStore } from '@/store/modules/setting';
let layoutSettingStore = useLayoutSettingStore();

// 刷新按钮点击回调
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh;
};
</script>

<style scoped></style>
