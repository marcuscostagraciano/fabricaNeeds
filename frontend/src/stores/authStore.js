import { ref } from 'vue';
import { defineStore } from 'pinia'

import AuthApi from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const authApi = new AuthApi()
  const accessTokenAgeInSeconds = 3 * 60 * 60
  const refreshTokenAgeInSeconds = 24 * 60 * 60

  function registerCookies(token) {
    document.cookie = `access=${token.access};max-age=${accessTokenAgeInSeconds};path=/`
    document.cookie = `refresh=${token.refresh};max-age=${refreshTokenAgeInSeconds};path=/`
  }

  function registerAccessCookie(access_token) {
    document.cookie = `access=${access_token};max-age=${accessTokenAgeInSeconds};path=/`
  }

  function getCookies() {
    let result_access;
    let result_refresh;
    return {
      access: (result_access = new RegExp('(?:^|; )access=([^;]*)').exec(document.cookie)) ? (result_access[1]) : null,
      refresh: (result_refresh = new RegExp('(?:^|; )refresh=([^;]*)').exec(document.cookie)) ? (result_refresh[1]) : null,
    };
  }

  async function getToken() {
    try{
      let token = getCookies()

      if(token.access != null){
        return token.access
      }

      if(token.refresh != null){
        token.access = await authApi.refreshAccessToken(token.refresh)
        registerAccessCookie(token.access)
        return token.access
      }

      window.location.replace(`${window.location.origin}/signin`)
      return null
    }
    catch(e){
      console.error(e.message)
    }
  }

  async function signIn(user_info) {
    try{
      const token = await authApi.getToken({
        "username": user_info.user,
        "password": user_info.password
      })
      registerCookies(token)
      
      window.location.replace(window.location.origin)  
    }
    catch(e){
      console.error(e.message)
    }
  }

  return { getToken, signIn }
})
