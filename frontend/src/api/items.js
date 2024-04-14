import axios from "axios";

export default class ItemsApi {
    async getItems() {
        const { data } = await axios.get(`/items/`)
        return data
    }
    async deleteItem(item_id) {
        const { data } = await axios.delete(`/items/${item_id}/`);
        return data.results;
    }
}
