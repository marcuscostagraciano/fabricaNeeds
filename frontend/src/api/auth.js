import axios from "axios";

export default class AuthApi {
    async getToken(user_info) {
        const { data } = await axios.post(`/token/`, user_info)
        return data
    }
}
