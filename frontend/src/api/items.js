import axios from "axios";

import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()
const token = await authStore.getToken()

export default class ItemsApi {
    async getItems() {
        const config = {
            headers: {Authorization: `Bearer ${token}`,},
        }

        const { data } = await axios.get(`/items/`, config)
        return data
    }
    async createItem(item) {
        const config = {
            headers: {Authorization: `Bearer ${token}`,},
        }

        const { data } = await axios.post(`/items/`, item, config)
        return data.results
    }
    // async deleteItem(item_name) {
    //     const { data } = await axios.delete(`/items/${item_name}/`);
    //     return data.results;
    // }
    async toggleActive(item_id, new_status) {
        const config = {
            headers: {Authorization: `Bearer ${token}`,},
        }

        const { data } = await axios.patch(`/items/${item_id}/`, new_status, config)
        return data.results
    }
    async getItemById(id) {
        const { data } = await axios.get(`/items/${id}/`)
        return data
    }
}
