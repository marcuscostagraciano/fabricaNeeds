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
        // What we will need for this recipe:
        //     - the user id;
        //     - item id;
        //     - justification ([actor] [action: adicionou R$/comprou] [item/value]).
        //         - ex: Marcus adicionou R$ 4
        let result_username = (new RegExp('(?:^|; )username=([^;]*)').exec(document.cookie)) ? (new RegExp('(?:^|; )username=([^;]*)').exec(document.cookie)[1]) : null;

        // This info will be added to the local variable
        const additional_info = {
            date: new Date().toISOString(),
            user: result_username,
            items: history_info.items,
            justification: `${result_username} ${history_info.action} ${history_info.items.map(item => item.name).join(", ")}`,
        }

        try {
            // await historyApi.createHistory()
            history.value.push(additional_info)
        }
        catch (err) {
            console.error(err);
        }
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
                // Get only the user username (since the user first name is not registered)
                // "entry.user.username" used to get the username from backend response
                // "entry.use" used to get the username from history creation response
                user: entry.user.username ? entry.user.username : entry.user,

                // Get a list of items names and prices
                items: entry.items.map(item => (
                    {
                        name: item.name ?? itemStore.getItemById(item.item).name,
                        price: item.price
                    })),

                justification: entry.justification,
            }
        })
    );
    const lastHistory = computed(() => history.value[(history.value.length) - 1])

    return { createHistory, registeredHistory, formattedHistory }
})
