import { defineStore } from 'pinia'

export const useAlertaStore = defineStore('alerta', {
  state: () => ({
    alerta: {
      color: '',
      icon: '',
      title: '',
      text: '',
      show: false
    }
  }),

  getters: {
    getAlerta(state) {
        return state.alerta
    }
  },
  actions: {
    setAlerta(payload: any) {
        this.alerta = payload
    }
  }
})
