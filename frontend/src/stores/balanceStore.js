import { ref } from 'vue';
import { defineStore } from 'pinia'

import BalanceApi from '@/api/balance';

export const useBalanceStore = defineStore('balance', () => {
    const balanceApi = new BalanceApi()

    async function getBalance() {
        return await BalanceApi.getBalance()
    }

    return { getBalance }
})
