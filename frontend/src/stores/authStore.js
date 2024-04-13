import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return { count: 0 }
  },

  actions: {
    increment() {
      this.count++
    },
  },
})
