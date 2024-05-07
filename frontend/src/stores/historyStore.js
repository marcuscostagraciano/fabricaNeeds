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

    const createJustification = (username, value, items) => {
        //     - justification ([actor] [action: adicionou R$/comprou] [item/value]).
        //         - ex: Marcus adicionou R$ 4
        //         - ex: Marcus comprou Pão, Café, Queijo

        if (value) {
            return `${username} adicionou R$${value}`
        }
        else if (items) {
            return `${username} comprou ${items.map(item => (itemStore.getItemById(item.item)).name).join(", ")}`
        }
        else {
            console.error("Operação indevida");
        }
    }

    async function createHistory(history_info) {
        // What we will need for this recipe:
        //     - the user id;
        //     - value (or not);
        //     - items (or not);
        let username = (new RegExp('(?:^|; )username=([^;]*)').exec(document.cookie)) ? (new RegExp('(?:^|; )username=([^;]*)').exec(document.cookie)[1]) : null;

        // This info will be added to the local variable
        const additional_info = {
            date: new Date().toISOString(),
            username,
            value: history_info.value,
            items: history_info.items,
            justification: createJustification(username, history_info.value, history_info.items
            ),
        }

        try {
            const history_obligatory_fields = {
                value: history_info.value,
                items: history_info.items,
                justification: additional_info.justification
            }
            await historyApi.createHistory(history_obligatory_fields)
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
                // "entry.username" used to get the username from local history creation
                // "entry.user.username" used to get the username from backend response
                user: entry.username ?? entry.user.username,

                value: entry.value,
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

    return { getHistory, createHistory, registeredHistory, formattedHistory }
})
