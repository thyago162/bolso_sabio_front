import { get, create } from '@/services/api'

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

export async function getAll(params: any) {
    const response = await get(url, params)
    if (response.status >= 400) {
        alert('Deu pau')
        return []
    }

    return response.data.data
}

export async function salvarRegistro(payload: any)  {
    const response = await create(url, payload)
    if (response.status == 201) {
        getAll({})
    } else {
        alert('Erro ao criar o registro')
    }
}

