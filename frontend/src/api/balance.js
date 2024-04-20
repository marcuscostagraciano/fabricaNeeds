import axios from "axios";

import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()
const token = await authStore.getToken()
const config = { headers: { Authorization: `Bearer ${token}`, }, }

export default class BalanceApi {
    async getBalance() {
        const { data } = await axios.get(`/balance/`, config)
        return data
    }
    //async createItem(item) {
    //    const { data } = await axios.post(`/items/`, item)
    //    return data.results
    //}
    // async deleteItem(item_name) {
    //     const { data } = await axios.delete(`/items/${item_name}/`);
    //     return data.results;
    // }
}