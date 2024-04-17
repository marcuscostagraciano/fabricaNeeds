import { ref } from 'vue';
import { defineStore } from 'pinia'

import AuthApi from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const authApi = new AuthApi()

  function registerCookies(token){
    // const access_time = new Date()
    // const refresh_time = new Date()
    
    // access_time.setTime(access_time.getTime + 1 * 3 * 60 * 60 * 1000)
    // access_time.setTime(access_time.getTime + 1 * 10 * 1000)
    // refresh_time.setTime(refresh_time.getTime + 1 * 24 * 60 * 60 * 1000)

    document.cookie = `access=${token.access};max-age=${10};path=/`
    document.cookie = `refresh=${token.refresh};max-age=${24 * 60 * 60};path=/`
  }

  function registerAccessCookies(access_token){
    const access_time = new Date()
    // access_time.setTime(access_time.getTime + 1 * 3 * 60 * 60 * 1000)
    access_time.setTime(access_time.getTime + 1 * 10 * 1000)
    document.cookie = `access=${access_token};max-age=${10};path=/`
  }

  function getCookies(){
    let result_access;
    let result_refresh;
    return {
      access: (result_access = new RegExp('(?:^|; )access=([^;]*)').exec(document.cookie)) ? (result_access[1]) : null,
      refresh: (result_refresh = new RegExp('(?:^|; )refresh=([^;]*)').exec(document.cookie)) ? (result_refresh[1]) : null,
    };
  }

  async function getToken(user_info) {
    let token = getCookies()

    if(token.access != null){
      console.log('usou access direto')
      return token
    }

    if(token.refresh != null){
      console.log('deu refresh no access token')
      token.access = await authApi.getToken({ 'refresh': token.refresh })
      registerAccessCookies(token.access)
      return token
    }

    console.log('logou')
    token = await authApi.getToken({
      "username": user_info.email,
      "password": user_info.password
    })
    registerCookies(token)
    return token
  }

  return { getToken }
})
