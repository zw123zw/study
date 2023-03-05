import { defineStore } from 'pinia'

export const useAppStore = defineStore('pure-app', {
  state: () => ({
    sidebar: false,
  }),
  getters: {
    getSidebar: state => state.sidebar,
  },
  actions: {
    TOGGLE_SIDEBAR() {
      console.log('设置sidebar')
    },
  },
})
