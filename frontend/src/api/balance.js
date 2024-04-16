import axios from "axios";

export default class BalanceApi {
    async getItems() {
        axios.get(`/balance/`)
            .then(response => {
                return response.data
            })
            .finally(response => {
                console.log(response);
            })
    }
}
