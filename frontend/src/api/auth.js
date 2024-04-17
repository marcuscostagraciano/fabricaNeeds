import axios from "axios";

export default class AuthApi {
    async getToken(user_info) {
        const { data } = await axios.post(`/token/`, user_info)
        return data
    }
    async refreshAccessToken(refresh_token){
        const { data } = await axios.post('/token/refresh/', refresh_token)
        return data
    }
}
