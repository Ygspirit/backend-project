<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select style="width: 240px" v-model="categoryStore.c1Id" >
                    <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select style="width: 240px">
                    <el-option label="选项"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select style="width: 240px">
                    <el-option label="选项"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Category' });
// 引入生命周期函数钩子
import { onMounted } from 'vue';
//引入分类相关的仓库
import {useCategoryStore} from '@/store/modules/category';
let categoryStore = useCategoryStore(); 
//通知仓库获取一级分类的方法
const getC1 = () => {
    //通知分类仓库发请求获取一级分类的数据
    categoryStore.getC1();
}

// 组件挂载完毕
onMounted(() => {
    // 获取一级分类的数据
    getC1()
})

</script>

<style scoped></style>
