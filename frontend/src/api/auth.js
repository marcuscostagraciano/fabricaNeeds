import axios from "axios";

export default class AuthApi {
    async getUserInfo(user) {
        axios.get(`/users/${user}/`)
            .then(response => {
                console.log(response.data)
                return response.data
            })
    }
}
