import { ref, computed } from 'vue';
import { defineStore } from 'pinia'

import { useHistoryStore } from './historyStore';

import BalanceApi from '@/api/balance';

export const useBalanceStore = defineStore('balance', () => {
    const historyStore = useHistoryStore()
    const balanceApi = new BalanceApi()

    const balance = ref(0)
    const loading = ref(false)

    async function getBalance() {
        loading.value = true
        balance.value = parseFloat((await balanceApi.getBalance()).value)
        loading.value = false
        return balance.value
    }

    const updateBalance = async (newValue) => {
        const value = parseFloat(newValue)

        try {
            if (value > 0) {
                // historyStore.createHistory({ value })
            }
            balanceApi.updateBalance({ value })

            balance.value += value
        }
        catch (err) {
            console.error(err);
        }
    }

    const registeredBalance = computed(() => { return balance.value })
    const fixedBalance = computed(() => { return balance.value.toFixed(2) })

    return { getBalance, updateBalance, registeredBalance, fixedBalance }
})
