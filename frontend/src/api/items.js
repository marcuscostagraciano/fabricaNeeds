import axios from "axios";

import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()
const token = await authStore.getToken()
const config = {
    headers: { Authorization: `Bearer ${token}`, },
}

export default class ItemsApi {
    async getItems() {
        const { data } = await axios.get(`/items/`, config)
        return data
    }
    async createItem(item) {
        const { data } = await axios.post(`/items/`, item, config)
        return data.results
    }
    // async deleteItem(item_name) {
    //     const { data } = await axios.delete(`/items/${item_name}/`);
    //     return data.results;
    // }
    async toggleActive(item_id, new_status) {
        const { data } = await axios.patch(`/items/${item_id}/`, new_status, config)
        return data.results
    }
}
