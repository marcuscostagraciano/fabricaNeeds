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

    const registeredBalance = computed(() => { return balance.value })

    return { getBalance, registeredBalance }
})
