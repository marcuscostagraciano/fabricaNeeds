import { ref } from 'vue';
import { defineStore } from 'pinia'

import ItemsApi from '@/api/items';

export const useItemStore = defineStore('user', () => {
    const itemsApi = new ItemsApi()

    async function getItems() {
        return await itemsApi.getItems()
    }
    async function deleteItem(id) {
        return await itemsApi.deleteItem(id)
    }

    return { getItems, deleteItem }
})
