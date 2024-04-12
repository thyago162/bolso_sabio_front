import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {},
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
        },

        getToken(state) {
            return state.auth.token
        }
    },
    actions: {
        setUser(user:any) {
            console.log(user)
            this.user = user
        },

        setAuth(auth: any) {
            this.auth.autenticado = true
            this.auth.token = auth.access_token
            this.auth.refreshToken = auth.refresh_token

            sessionStorage.setItem('token', auth.access_token)
            sessionStorage.setItem('autenticado', 'true')
        }
    }
})