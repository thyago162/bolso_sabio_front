import type { Pagination } from '@/models/Pagination'
import type { TipoInvestimento } from '@/models/TipoInvestimentoModel'
import {defineStore} from 'pinia'

export const useTipoInvestimentoStore = defineStore('tipoInvestimento', {
    state: () => ({
        tipo_investimento: {} as Pagination<TipoInvestimento>
    }),

    getters: {
        getTiposInvestimento(state): Pagination<TipoInvestimento> {
            return state.tipo_investimento
        }
    },

    actions: {
        setTiposInvestimento(payload: any) {
            console.log(payload)
            this.tipo_investimento = payload
        }
    }
})