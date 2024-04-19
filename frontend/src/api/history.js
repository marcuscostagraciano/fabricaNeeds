import axios from "axios";

export default class HistoryApi {
    async getHistory() {
        const { data } = await axios.get(`/history/`)
        return data
    }
}
