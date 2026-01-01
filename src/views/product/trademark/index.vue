<template>
  <el-card>
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="default" @click="addTrademark" icon="Plus">添加品牌</el-button>
    <!-- 表格组件，用于展示已有的平台数据 -->
    <!-- 
        table
        ---border: 设置表格纵向是否有边框
        table-column
        ---label: 表头名称
        ---width: 列宽
        ---align: 对齐方式
     -->
    <el-table border :data="trademarkArr" style="margin: 10px 0">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
          <el-button type="primary" size="small" icon="Delete" @click=""></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件-->
    <!-- 
        pagination
        ---v-model:current-page: 分页器当前页码
        ---v-model:page-size:设置每一个展示数据条数
        ---:page-sizes: 设置每页展示条数可选项(下拉菜单)
        ---:background: 开启分页器背景色
        ---layout: 设置分页器六个子组件的布局
    -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="getHasTrademark"
      pager-count="9"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, -> ,sizes,total"
      :total="total"
    />
  </el-card>

  <!-- 对话框组件：在添加品牌与修改已有品牌的业务时使用结构 -->
  <!-- 
      v-model:属性用户控制对话框的显示与隐藏
      title：设置对话框左上角的标题
  -->
  <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
    <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" label-width="80px" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName" />
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
        <!-- upload组件属性：action -->
        <el-upload
          class="avatar-uploader"
          :headers="headers"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 具名插槽：footer -->
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
defineOptions({ name: 'Trademark' });
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqHasTradeMark, reqAddOrUpdateTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type';
import { useUserStore } from '@/store/modules/user';
import { ElMessage, type UploadProps } from 'element-plus';
let userStore = useUserStore();
// 当前页码
let pageNo = ref<number>(1);
// 每页展示条数
let limit = ref<number>(3);
// 存储已有品牌数据总数
let total = ref<number>(0);
// 存储已有品牌的数据
let trademarkArr = ref<Records>([]);
// 控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false);
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
});
// 上传图片请求头token
let headers = ref({ Token: userStore.token });
// 获取el-form组件实例
let formRef = ref();

// 获取已有品牌的接口封装为一个函数：在任何情况下获取数据，调用此函数即可
const getHasTrademark = async (pager = 1) => {
  // 当前页码
  pageNo.value = pager;
  console.log(pageNo.value, pager);

  const res: TradeMarkResponseData = await reqHasTradeMark(pageNo.value, limit.value);
  // console.log(res);
  if (res.code === 200) {
    // 存储已有品牌的总个数
    total.value = res.data.total;
    trademarkArr.value = res.data.records;
  }
};
// 组件挂载完毕钩子---发一次请求，获取第一页，一夜三个已有品牌的数据
onMounted(() => {
  getHasTrademark();
});

// 分页器当前页码发生变化的时候会触发
// 对于当前页码发生变化自定义事件，组件pagination父组件回传了数据（当前的页码）
// const changePageNo=(pager)=>{
//   // 当前页码发生变化的时候再次发请求获取对应已有品牌数据展示
//   getHasTrademark()
// }

// 当下拉菜单发生变化的时候会触发此方法
// 这个自定义事件，分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  // 当前每一页的数据量发生变化时，当前页码归1
  getHasTrademark();
};

// 添加已有品牌的按钮的回调
const addTrademark = () => {
  dialogFormVisible.value = true;
  // 收集数据清空
  trademarkParams.id = 0;
  trademarkParams.tmName = '';
  trademarkParams.logoUrl = '';

  // dom更新后清除校验规则
  nextTick(() => {
    formRef.value.clearValidate('tmName');
    formRef.value.clearValidate('logoUrl');
  });
  // 第一种写法：ts的问号语法
  // formRef.value?.clearValidate('tmName');
  // formRef.value?.clearValidate('logoUrl');
};

// 修改已有品牌的按钮回调
// row:row即为当前已有的品牌
const updateTrademark = (row: TradeMark) => {
  // 清空校验规则错误提示信息
  nextTick(() => {
    formRef.value.clearValidate('tmName');
    formRef.value.clearValidate('logoUrl');
  });
  // 对话框显示
  dialogFormVisible.value = true;
  // ES6语法合并对象
  Object.assign(trademarkParams, row);
  // trademarkParams.id = row.id;
  // // 展示已有品牌的数据
  // trademarkParams.tmName = row.tmName;
  // trademarkParams.logoUrl = row.logoUrl;
};

// 对话框底部取消按钮
const cancel = () => {
  dialogFormVisible.value = false;
};

//
const confirm = async () => {
  // 发送请求之前，要对整个表单进行校验
  await formRef.value.validate();
  const res = await reqAddOrUpdateTrademark(trademarkParams);
  // console.log(res);
  if (res.code == 200) {
    // 关闭对话框
    dialogFormVisible.value = false;
    // 弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    });
    // 再次发请求，获取已有全部的品牌数据
    getHasTrademark(trademarkParams.id ? pageNo.value : 1);
  } else {
    // 添加品牌失败
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    });
    // 关闭对话框
    dialogFormVisible.value = false;
  }
};

// 上传图片组件-->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 这个钩子是在图片上传成功之前触发，可以约束文件类型与大小
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      });
      return false;
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    });
    return false;
  }
};

// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // response:即为当前这次上传图片post请求服务器返回的数据
  // 收集上传图片的地址，添加新品牌时带给服务器
  trademarkParams.logoUrl = response.data;
  // 图片上传成功，清除对应玉佩校验效果
  formRef.value.clearValidate('logoUrl');
};

// 品牌自定义校验规则的方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error('品牌名称位数大于等于两位'));
  }
};
// 品牌LOGO图片的自定义校验规则
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack();
  } else {
    callBack(new Error('LOGO图片必须上传'));
  }
};
// 表单校验规则对象
const rules = {
  tmName: [
    // required：这个字段必须校验
    // trigger:代表触发校验规则的时机
    { required: true, trigger: 'blur', validator: validatorTmName },
  ],
  logoUrl: [{ required: true, trigger: 'change', validator: validatorLogoUrl }],
};
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
