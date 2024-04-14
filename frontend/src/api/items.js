import axios from "axios";

export default class ItemsApi {
    async getItems() {
        axios.get(`/items/`)
            .then(response => {
                return response.data
            })
            .finally(response => {
                console.log(response);
            })
    }
}
