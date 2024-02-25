import { ref } from "vue"
import { get, create, update, destroy } from '@/services/api'

const url = 'users'
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
        key: 'nome_completo'
    },
    {
        title: 'EMAIL',
        aling: 'start',
        sortable: false,
        key: 'email'
    },
    {
        title: 'CPF',
        aling: 'start',
        sortable: false,
        key: 'cpf'
    },
    {
        title: 'TELEFONE',
        align: 'start',
        sortable: false,
        key: 'telefone'
    },
    {
        title: 'Actions',
        align: 'start',
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