import axios from "axios";

export default class UsersApi {
    async createUser(user) {
        const { data } = await axios.post("/users/", user);
        return data.results;
    }
}
