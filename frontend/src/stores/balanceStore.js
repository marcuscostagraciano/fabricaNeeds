import { ref, computed } from 'vue';
import { defineStore } from 'pinia'

import BalanceApi from '@/api/balance';

export const useBalanceStore = defineStore('balance', () => {
    const balanceApi = new BalanceApi()

    const balance = ref(0)
    const loading = ref(false)

    async function getBalance() {
        loading.value = true
        balance.value = (await balanceApi.getBalance()).value
        loading.value = false
        return balance.value
    }

    const updateBalance = async (newValue) => {
        const value = parseFloat(newValue)

        try {
            await balanceApi.updateBalance({ value })
            balance.value += parseFloat(value)
        }
        catch (err) {
            console.error(err);
        }
    }

    const registeredBalance = computed(() => { return balance.value })
    const fixedBalance = computed(() => { return balance.value.toFixed(2) })

    return { getBalance, updateBalance, registeredBalance, fixedBalance }
})
