import axios from "axios";

export default class UsersApi {
    async createUser(userData) {
        const { data } = await axios.post(`/user/`, userData)
        return data.results
    }
}
