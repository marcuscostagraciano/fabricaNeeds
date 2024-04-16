import { ref } from 'vue';
import { defineStore } from 'pinia'

import AuthApi from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const authApi = new AuthApi()

  async function getToken(user_info) {
    const token = await authApi.getToken({
      "username": user_info.email,
      "password": user_info.password
    })

    return token
  }

  return { getToken }
})
