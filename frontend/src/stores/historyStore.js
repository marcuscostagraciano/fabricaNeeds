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
    const formattedHistory = computed(() =>
        history.value.map(entry => {
            const date = new Date(entry.date)
            // Addition of leading 0, if hour or minute only have 1 digit 
            const hour = String(date.getHours()).padStart(2, "0")
            const minutes = String(date.getMinutes()).padStart(2, "0")

            return {
                datetime: {
                    day: date.getDate(),
                    // This goes from 0 to 11
                    month: date.getMonth() + 1,
                    hour: hour,
                    minutes: minutes,
                },
                user: entry.user,
                item: itemStore.getItemById(entry.id),
                justification: entry.justification,
            }
        })
    );

    return { registeredHistory, formattedHistory }
})
