import { get, create, update, destroy } from '@/services/api'
import {useTipoInvestimentoStore} from '@/stores/tipo-investimento'
import { useAlertaStore } from '@/stores/alerta'
import { ref } from 'vue'
const url = 'tipos-investimento'

export const headers = [
    {
        title: 'ID',
        aling: 'start',
        sortable: true,
        key: 'id'
    },
    {
        title: 'NOME',
        aling: 'start',
        sortable: false,
        key: 'nome'
    },
    {
        title: 'TIPO',
        aling: 'start',
        sortable: true,
        key: 'tipo_renda'
    },
    {
        title: 'AÇÕES',
        key: 'actions'
    }
]
const alerta = ref({
    color: '',
    icon: '',
    title: '',
    text: '',
    show: false
})

function setAlertaSucesso(title: string, text: string) {
    alerta.value.color = 'success'
    alerta.value.icon = '$success'
    alerta.value.title = title
    alerta.value.text = text
    alerta.value.show = true

    useAlertaStore().setAlerta(alerta.value)
    getAll({})
}

export function getAll(params: any) {
    get(url, params).then(response => {
        useTipoInvestimentoStore().setTiposInvestimento(response.data)    
    })
    .catch(err => {
        console.log(err.response)
    })
    
}

export function salvarRegistro(payload: any)  {
    create(url, payload).then(() => {
        setAlertaSucesso('Sucesso', 'Registro salvo com sucesso')
    })
    .catch(err => {
        console.log(err.response)
    })
}

export function atualizarRegistro(payload: any, id: number) {
    update(url, id, payload).then(() => {
        setAlertaSucesso('Sucesso', 'Registro atualizado com sucesso')
    })
    .catch(err => {
        console.log(err.response)
    })

}

export function removerRegistro(id: number) {
    destroy(url, id).then(() => {
        console.log('entrou?')
        setAlertaSucesso('Sucesso', 'Registro removido com sucesso')
    }).catch(err => {
        console.log(err.response)
    })
}

