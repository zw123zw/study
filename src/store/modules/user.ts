import { defineStore } from 'pinia'

export const useUserStore = defineStore('pure-user', {
  state: () => ({
    verifyCode: '',
  }),
  getters: {},
  actions: {
    /** 存储前端生成的验证码 */
    SET_VERIFYCODE(verifyCode: string) {
      this.verifyCode = verifyCode
    },
  },
})
