<template>
  <!-- 左侧菜单栏是否折叠 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.folded ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑动态展示路由的名字与标题 -->
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <!-- 图标 -->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 面包屑展示匹配路由的标题 -->
      <span style="margin: 0 2px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
defineOptions({ name: 'Breadcrumb' });
// 获取layout配置相关的仓库
import { useLayoutSettingStore } from '@/store/modules/setting';
let layoutSettingStore = useLayoutSettingStore();
// 获取路由对象
import { useRoute } from 'vue-router';
let $route = useRoute();

const changeIcon = () => {
  layoutSettingStore.folded = !layoutSettingStore.folded;
};
</script>

<style scoped lang="scss">

</style>
