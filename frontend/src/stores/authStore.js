import { ref } from 'vue';
import { defineStore } from 'pinia'

import AuthApi from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const authApi = new AuthApi()
  const accessTokenAgeInSeconds = 3 * 60 * 60
  const refreshTokenAgeInSeconds = 24 * 60 * 60
  const usernameAgeInSeconds = 24 * 60 * 60

  function registerCookies(access_token, refresh_token, username) {
    document.cookie = `access=${access_token};max-age=${accessTokenAgeInSeconds};path=/`
    document.cookie = `refresh=${refresh_token};max-age=${refreshTokenAgeInSeconds};path=/`
    document.cookie = `username=${username};max-age=${usernameAgeInSeconds};path=/`
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

  async function clearCookies() {
    document.cookie = `access=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
    document.cookie = `refresh=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
    document.cookie = `username=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
  }

  async function getToken() {
    try {
      let { access: access_token, refresh: refresh_token } = getCookies()

      if (access_token != null) {
        return access_token
      }

      if (refresh_token != null) {
        access_token = await authApi.refreshAccessToken(refresh_token)
        registerAccessCookie(access_token)
        return access_token
      }

      window.location.replace(`${window.location.origin}/signin`)
      return null
    }
    catch (e) {
      console.error(e.message)
    }
  }

  async function signIn(user_info) {
    try {
      const token = await authApi.getToken({
        "username": user_info.user,
        "password": user_info.password
      })
      registerCookies(token.access, token.refresh, user_info.user)

      window.location.replace(window.location.origin)
    }
    catch (e) {
      alert("Algo deu errado! Por favor revise e reinsira suas informações!")
      console.error(e.message)
    }
  }

  return { clearCookies, getToken, signIn }
})
