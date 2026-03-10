import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CategoryResponseData, CategoryObj } from '@/api/product/attr/type';

// 引入分类接口函数
import { reqC1, reqC2, reqC3 } from '@/api/product/attr';

export const useCategoryStore = defineStore('Category', () => {
    // 存储一级分类的数据
    let c1Arr = ref<Array<CategoryObj>>([]);
    let c1Id = ref<number | string>('');
    // 存储二级分类的数据
    let c2Arr = ref<Array<CategoryObj>>([]);
    let c2Id = ref<number | string>('');

    // 存储三级分类的数据
    let c3Arr = ref<Array<CategoryObj>>([]);
    let c3Id = ref<number | string>('');

    // 获取一级分类数据的函数
    const getC1 = (async () => {
        let res: CategoryResponseData = await reqC1();
        if (res.code === 200) {
            c1Arr.value = res.data;
        }

    })

    // 获取二级分类数据的函数
    const getC2 = async () => {
        // 获取对应一级分类的下二级分类的数据
        let result: CategoryResponseData = await reqC2(c1Id.value)
        if (result.code === 200) {
            c2Arr.value = result.data
        }
    }

    // 获取三级分类数据的函数
    const getC3 = async () => {
        // 获取对应一级分类的下二级分类的数据
        let result: CategoryResponseData = await reqC3(c2Id.value)
        if (result.code === 200) {
            c3Arr.value = result.data
        }
    }
    return { c1Arr, c1Id, getC1, getC2, c2Arr, c2Id, getC3, c3Arr, c3Id };
})