<template>
  <el-button size="small" @click="updateRefsh" icon="Refresh" circle></el-button>
  <el-button size="small" @click="fullScreen" icon="FullScreen" circle></el-button>
  <el-button size="small" @click="" icon="Setting" circle></el-button>
  <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%" />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
defineOptions({ name: 'Setting' });
// 获取路由器对象
import { useRouter,useRoute } from 'vue-router';
let $router = useRouter();
// 获取当前路由对象
let $route = useRoute();
// 获取layout配置相关的仓库
import { useLayoutSettingStore } from '@/store/modules/setting';
let layoutSettingStore = useLayoutSettingStore();
// 获取用户相关的小仓库
import { useUserStore } from '@/store/modules/user';
let userStore = useUserStore();

// 刷新按钮点击回调
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh;
};

// 全屏按钮点击回调
const fullScreen = () => {
  // DOM对象的一个属性，可以用来判断当前是不是全屏模式【全屏：true，非全屏：false】
  let full = document.fullscreenElement;
  // 切换为全屏模式
  if (!full) {
    // 文档根节点的方法requestFullscreen()，实现全屏模式
    document.documentElement.requestFullscreen();
  } else {
    // 退出全屏模式
    document.exitFullscreen();
  }
};

// 退出登录按钮点击回调
const logout =async () => {
  // 第一件事：需要向服务器发送请求【退出登录接口】，通知服务器清除token【模拟】
  // 第二件事：仓库中关于用于相关的数据清空（比如token、username、avatar）
  // 第三件事：跳转到登录页面
await  userStore.userLogout();
  $router.push({ path: '/login' ,query: { redirect: $route.path } });
};
</script>

<style scoped></style>
