import { computed, ref } from 'vue';
import { defineStore } from 'pinia'

import ItemsApi from '@/api/items';

export const useItemStore = defineStore('item', () => {
    const itemsApi = new ItemsApi()
    const items = ref([])
    const loading = ref(false)

    async function getItems() {
        loading.value = true
        items.value = await itemsApi.getItems()
        loading.value = false
        return items.value
    }

    async function createItem(item) {
        const item_already_registered = items.value
            .filter(registed_item => (registed_item.name === item.name))

        if (!item_already_registered.length) {
            items.value.push({
                "name": item.name,
                "active": item.active
            })
            await itemsApi.createItem(item)
        }
        else alert("Item já registrado")
    }

    // async function deleteItem(name) {
    //     items.value = items.value.filter(item => (item.name !== name))
    //     return await itemsApi.deleteItem(name)
    // }

    const registeredItems = computed(() => { return items.value })
    const activeItems = computed(() => (items.value.filter(item => (item.active))))
    const inactiveItems = computed(() => (items.value.filter(item => (!item.active))))

    return { getItems, createItem, registeredItems, activeItems, inactiveItems }
})
