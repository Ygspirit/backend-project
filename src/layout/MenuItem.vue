<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="!item.meta.hidden">
        <!-- <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon> -->
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由但是只有一个子路由 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
        <!-- <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon> -->
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由且个数大于一个1 -->
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
      <template #title>
        <!-- <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon> -->
        <span>{{ item.meta.title }}</span>
      </template>
      <MenuItem :menuList="item.children"></MenuItem>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineOptions({ name: 'MenuItem' });
defineProps(['menuList']);
</script>

<style scoped lang="scss">
.el-menu-item {
  display: block;
}
</style>
