<template>
  <el-row class="login_container">
    <el-col :span="12" :xs="0"></el-col>
    <el-col :span="12">
      <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginrules">
        <div class="form_title">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
        </div>
        <el-form-item prop="username"><el-input :prefix-icon="User" v-model="loginForm.username" /></el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" type="password" show-password v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login_btn" size="default" @click="login" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
defineOptions({ name: 'Login' });
import { User, Lock } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const $router = useRouter();
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
import { getTextTime } from '@/utils/time';
let textTime = ref(getTextTime());

// 登录
// 登录按钮加载效果
let loading = ref(false);
let loginForm = reactive({ username: 'admin', password: '111111' });
let loginFormRef = ref();
async function login() {
  // 表单校验全部通过后才能发起请求
  await loginFormRef.value.validate();
  loading.value = true;
  // 登录请求
  try {
    await userStore.userLogin(loginForm);
    ElNotification({
      title: '欢迎回来',
      type: 'success',
      message: `hi，${textTime.value}好`,
    });
    $router.push('/');
    loading.value = false;
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    });
    loading.value = false;
  }
}
// 自定义校验规则
function validatorUserName(rule: any, value: any, callback: any) {
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error('账号长度至少5位'));
  }
}
// 登录表单校验
let loginrules = reactive({
  username: [{ validator: validatorUserName, trigger: 'change' }],
  password: [{ required: true, min: 6, max: 12, message: '密码的长度最少是6-12位', trigger: 'change' }],
});
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    width: 80%;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    position: relative;
    top: 30vh;
    padding: 40px;
    .form_title {
      color: white;
      h1 {
        font-size: 40px;
        margin-bottom: 20px;
      }
      h2 {
        font-size: 20px;
        margin-bottom: 20px;
      }
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
