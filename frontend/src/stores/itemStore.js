import { computed, ref } from 'vue';
import { defineStore } from 'pinia'

import ItemsApi from '@/api/items';

export const useItemStore = defineStore('item', () => {
    const itemsApi = new ItemsApi()

    // STATES
    const items = ref([])
    const loading = ref(false)

    // ACTIONS
    const getItems = async () => {
        loading.value = true
        items.value = await itemsApi.getItems()
        loading.value = false
        return items.value
    }

    const createItem = async (item) => {
        // Check for existing item within the items list with the same name
        const existingItem = items.value.find(registeredItem => registeredItem.name === item.name);

        if (existingItem) {
            alert("Item já registrado");
            return; // Early exit on existing item
        }

        // Generate ID and create item object
        const newItem = {
            id: lastItem.value !== undefined ? lastItem.value.id + 1 : 1,
            name: item.name,
            active: item.active
        };

        // Update local state and call API
        items.value.push(newItem);
        await itemsApi.createItem(newItem);
    }

    const toggleActive = async (id) => {
        // "id - 1" is used to update the list locally, since it starts at 0
        items.value[id - 1].active = !items.value[id - 1].active
        itemsApi.toggleActive(id, { "active": items.value[id - 1].active })
    }

    const getItemById = (id) => (items.value[id - 1])

    // Initial data fetch (called immediately after the store is initialized to fetch data)
    getItems()

    // GETTERS
    const registeredItems = computed(() => { return items.value })
    const activeItems = computed(() => (items.value.filter(item => (item.active))))
    // Filtes active items by update date
    const activeItemsByRecentUpdate = computed(() =>
        items.value.filter(item => item.active)
            .sort((a, b) => new Date(b.last_update) - new Date(a.last_update)))
    const inactiveItems = computed(() => (items.value.filter(item => (!item.active))))
    const lastItem = computed(() => items.value[(items.value.length) - 1])

    return {
        getItems, createItem, toggleActive, getItemById,
        registeredItems, activeItems, activeItemsByRecentUpdate, inactiveItems
    }
})
