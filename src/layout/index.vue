<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo />
      <div class="mune_container">
        <el-scrollbar height="100%">
          <el-menu background-color="#001529" text-color="white">
            <MenuItem :menuList="menuStore.menuList"></MenuItem>
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
    <div class="layout_tabbar"></div>
    <div class="layout_main"></div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' });
import Logo from './Logo.vue';
import MenuItem from './MenuItem.vue';
import { useMenuStore } from '@/store/modules/menu';
const menuStore = useMenuStore();
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
