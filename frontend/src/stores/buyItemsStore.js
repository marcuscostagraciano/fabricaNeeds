import { ref, computed } from 'vue';
import { defineStore } from 'pinia'

import { useBalanceStore } from './balanceStore';
import { useItemStore } from './itemStore';
import { useHistoryStore } from './historyStore';

export const useBuyItemsStore = defineStore('buyItems', () => {
    const balanceStore = useBalanceStore()
    const itemStore = useItemStore()
    const historyStore = useHistoryStore()

    const buyItems = async (itemsAndPrices) => {
        let items = []
        for (const item_id in itemsAndPrices) {
            // Works as intended
            // itemStore.toggleActive(item_id)

            // Works as intended
            // balanceStore.updateBalance(-itemsAndPrices[item_id])

            items.push(itemStore.getItemById(item_id))
        }
        // WIP
        historyStore.createHistory({
            items,
            action: 'comprou'
        })
    }

    return { buyItems }
})
