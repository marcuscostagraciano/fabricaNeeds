import axios from "axios";

export default class ItemsApi {
    async getItems() {
        const { data } = await axios.get(`/items/`)
        return data
    }
    async createItem(item) {
        const { data } = await axios.post(`/items/`, item)
        return data.results
    }
    async deleteItem(item_id) {
        const { data } = await axios.delete(`/items/${item_id}/`);
        return data.results;
    }
}
