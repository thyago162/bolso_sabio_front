import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            nome_completo: '',
        },
        auth: {
            autenticado: false,
            token: '',
            refreshToken: ''
        }
    }),
    getters: {
        getUser(state) {
            return state.user
        },

        getAuth(state) {
            return state.auth
        }
    },
    actions: {
        setUser(user:any) {
            this.user = user
        },

        setAuth(auth: any) {
            this.auth.autenticado = true
            this.auth.token = auth.token
            this.auth.refreshToken = auth.refreshToken
        }
    }
})