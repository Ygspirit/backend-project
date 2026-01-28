import { defineStore } from 'pinia';
import { ref } from 'vue';

// 引入分类接口函数
import { reqC1 } from '@/api/product/attr';

export const useCategoryStore = defineStore('Category', () => {
    // 存储一级分类的数据
    let c1Arr = ref<Array<any>>([]);
    let c1Id = ref<number | string>('');
    // 获取一级分类数据的函数
    const getC1 = (async () => {
        let res = await reqC1();
        if (res.code == 200) {
            c1Arr.value = res.data;
        }

    })

    return { c1Arr, c1Id, getC1 };
})