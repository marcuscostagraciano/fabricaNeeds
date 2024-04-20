import { ref, computed } from 'vue';
import { defineStore } from 'pinia'

import { useItemStore } from './itemStore';
import HistoryApi from '@/api/history';

export const useHistoryStore = defineStore('history', () => {
    const historyApi = new HistoryApi()
    const itemStore = new useItemStore()

    const history = ref([])
    const loading = ref(false)

    async function getHistory() {
        loading.value = true
        history.value = await historyApi.getHistory()
        loading.value = false
        return history.value
    }

    getHistory()

    const registeredHistory = computed(() => (history.value))
    const formatedHistory = computed(() =>
        history.value.map(entry => ({
            date: entry.date,
            user: entry.user,
            item: itemStore.getItemById(entry.id),
            justification: entry.justification,
        }))
    )

    return { registeredHistory, formatedHistory }
})
