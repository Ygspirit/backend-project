<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo />
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <div class="mune_container">
        <el-scrollbar height="100%">
          <!-- 菜单组件 -->
          <el-menu background-color="#001529" text-color="white">
            <Menu :menuList="userStore.menuRoutes"></Menu>
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" style="background-color: aquamarine">123</div>
    <!-- 内容展示区域 -->
    <div class="layout_main" style="background-color: burlywood">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' });
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Main from './main/index.vue';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    .mune_container {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
        .el-menu-item {
          flex-direction: column;
        }
      }
    }
  }
  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: fixed;
    top: 0;
    left: $base-menu-width;
  }
  .layout_main {
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    overflow: auto;
    padding: 20px;
  }
}
</style>
