import axios from "axios";

export default class UsersApi {
    async createUser(user) {
        await axios.post("/users/", user)
            .then(() => {
                alert("Cadastro realizado com sucesso!")
                return true
            })
            .catch((err) => {
                console.log(err)
                return false
            })
    }
}
