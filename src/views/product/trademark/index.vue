<template>
  <el-card>
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="default" @click="" icon="Plus">添加品牌</el-button>
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
          <el-button type="primary" size="small" icon="Edit" @click=""></el-button>
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
</template>

<script setup lang="ts">
defineOptions({ name: 'Trademark' });
import { ref, onMounted } from 'vue';
import { reqHasTradeMark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData } from '@/api/product/trademark/type';
// 当前页码
let pageNo = ref<number>(1);
// 每页展示条数
let limit = ref<number>(3);
// 存储已有品牌数据总数
let total = ref<number>(0);
// 存储已有品牌的数据
let trademarkArr = ref<Records>([]);
// 获取已有品牌的接口封装为一个函数：在任何情况下获取数据，调用此函数即可
const getHasTrademark = async (pager = 1) => {
  // 当前页码
  pageNo.value = pager;
  console.log(pageNo.value,pager);
  
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
</script>

<style scoped></style>
