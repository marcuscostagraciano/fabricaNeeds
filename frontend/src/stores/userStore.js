import { ref } from 'vue';
import { defineStore } from 'pinia'

import UsersApi from '@/api/users';

export const useUserStore = defineStore('user', () => {
    const usersApi = new UsersApi()

    const createUser = async (userData) => {
        try {
            await usersApi.createUser({
                "username": userData.username,
                "password": userData.password,
            })
            alert('Cadastro realizado com sucesso!')
        }
        catch (err) {
            alert("Algo deu errado! Por favor revise e reinsira suas informações!")
            console.log(err);
            return false
        }
        return true
    }

    return { createUser }
})
