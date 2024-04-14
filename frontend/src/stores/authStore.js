import { ref } from 'vue';
import { defineStore } from 'pinia'

import AuthApi from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const authApi = new AuthApi()

  async function getUserInfo(id) {
    return await authApi.getUserInfo(id)
  }

  return { getUserInfo }
})
