import { ref } from 'vue';
import { defineStore } from 'pinia'

import ItemsApi from '@/api/items';

export const useItemStore = defineStore('item', () => {
    const itemsApi = new ItemsApi()
    const items = ref([])

    async function getItems() {
        return await itemsApi.getItems()
    }
    async function deleteItem(id) {
        return await itemsApi.deleteItem(id)
    }

    return { getItems, deleteItem }
})
