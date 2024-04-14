import { ref } from 'vue';
import { defineStore } from 'pinia'

import UsersApi from '@/api/users';

export const useUserStore = defineStore('user', () => {
    const usersApi = new UsersApi()

    async function createUser(data) {
        return await usersApi.createUser({
            "name": data.name,
            "email": data.email,
            "password": data.password,
            "balance": null,
        })
    }

    return { createUser }
})
