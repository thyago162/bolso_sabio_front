import {get} from '@/services/api'
import { useTipoInvestimentoStore } from '@/stores/tipo-investimento'

const url = 'tipos-investimento'
const tipo_investimento_store = useTipoInvestimentoStore()

export function getAll() {
    get(url, {})
    .then(res => {
       tipo_investimento_store.setTiposInvestimento(res)
    })
    .catch(err => {
        alert('eita leleu')
    })
}