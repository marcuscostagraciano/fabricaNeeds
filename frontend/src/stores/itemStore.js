import { ref } from 'vue';
import { defineStore } from 'pinia'

import ItemsApi from '@/api/items';

export const useItemStore = defineStore('user', () => {
    const itemsApi = new ItemsApi()

    async function getItems() {
        return await itemsApi.getItems()
    }

    return { getItems }
})
