import { ref, computed } from 'vue';
import { defineStore } from 'pinia'

import HistoryApi from '@/api/history';

export const useHistoryStore = defineStore('history', () => {
    const historyApi = new HistoryApi()

    const history = ref([])
    const loading = ref(false)

    async function getHistory() {
        loading.value = true
        history.value.push(await historyApi.getHistory())
        loading.value = false
        return history.value
    }

    getHistory()

    return { getHistory }
})
