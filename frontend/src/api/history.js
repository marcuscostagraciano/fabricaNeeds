import axios from "axios";

import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()
const token = await authStore.getToken()
const config = { headers: { Authorization: `Bearer ${token}`, }, }

export default class HistoryApi {
    async getHistory() {
        const { data } = await axios.get(`/history/`, config)
        return data
    }
    async createHistory(history_info) {
        const { data } = await axios.post(`/history/`, history_info, config)
        return data
    }
}
