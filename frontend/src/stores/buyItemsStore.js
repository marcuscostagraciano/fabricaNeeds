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
        try {
            let items = []

            for (const item_id in itemsAndPrices) {
                items.push({
                    item: item_id,
                    price: itemsAndPrices[item_id]
                })

                await Promise.all([
                    itemStore.toggleActive(item_id),
                    balanceStore.updateBalance(-itemsAndPrices[item_id]),
                    historyStore.createHistory({ value: 0, items })
                ])
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    return { buyItems }
})
