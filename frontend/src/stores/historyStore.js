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

    async function createHistory(history_info) {
        // We'll need for this recipe:
        //     - the user id;
        //     - item id;
        //     - justification ([actor] [action: adicionou R$/comprou] [item/value]).
        //         - ex: Marcus adicionou R$ 4
        let result_username
        (result_username = new RegExp('(?:^|; )username=([^;]*)').exec(document.cookie)) ? (result_username[1]) : null
        result_username = result_username[1]

        const additional_info = {
            id: lastHistory.value != undefined ? lastHistory.value.id + 1 : 1,
            date: new Date().toISOString(),
            user: history_info.user,
            item: history_info.item,
            justification: `${result_username} WIP`,
        }
        console.log(additional_info);
        history.value.push(additional_info)
        // await historyApi.createHistory(history)
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
                // Get only the user usernama (since we user first name is not registered)
                user: entry.user.username,
                // item: itemStore.getItemById(entry.id),

                // Get a list of items names
                items: entry.items.map(item => (itemStore.getItemById(item.item).name)),
                justification: entry.justification,
            }
        })
    );
    const lastHistory = computed(() => history.value[(history.value.length) - 1])

    return { createHistory, registeredHistory, formattedHistory }
})
