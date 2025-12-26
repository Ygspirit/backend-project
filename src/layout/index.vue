<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo />
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <div class="mune_container">
        <el-scrollbar height="100%">
          <!-- 菜单组件 -->
          <el-menu
            :default-active="$route.path"
            background-color="#001529"
            text-color="white"
            active-text-color="#FFDE59"
          >
            <Menu :menuList="userStore.menuRoutes"></Menu>
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">
      <!-- layout组件的顶部导航tabbar -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main" style="background-color: burlywood">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' });
// 获取路由对象
import { useRoute } from 'vue-router';
let $route = useRoute();
// 引入左侧菜单logo组件
import Logo from './logo/index.vue';
// 引入左侧菜单组件
import Menu from './menu/index.vue';
// 引入右侧主内容组件
import Main from './main/index.vue';
// 引入顶部tabbar组件
import Tabbar from './tabbar/index.vue';
// 获取用户相关的小仓库
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
