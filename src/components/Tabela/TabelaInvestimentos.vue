<script setup lang="ts">
import { ref } from 'vue';
import {get} from "@/services/api"
import CardInfoInvestimento from '../Card/CardInfoInvestimento.vue';

const emit = defineEmits(['paginarTabela', 'visualizarInvestimento'])
const props = defineProps({
    investimentos: {
        required: true,
        type: Object as any
    }
})

const headers = ref([
    {
        title: 'Descrição',
        align: 'end',
        key: 'descricao',
    },
    { title: 'Tipo de investimento', sortable: true, key: 'tipo_investimento.nome', align: 'end' },
    { title: 'Categoria', key: 'categoria.nome', sortable: true, align: 'end' },
    { title: 'Quantidade', key: 'quantidade', align: 'end' },
    { title: 'Valor bruto', key: 'valor_bruto', align: 'end' },
    { title: 'Ações', key: 'actions', sortable: false },
])
const loading = ref(false)
const totalItems = 0
const dialog_investimento = ref(false)
const investimento = ref()

//FUNÇÕES
function loadItems({ page, itemsPerPage, sortBy }: any) {
    emit('paginarTabela', { page, itemsPerPage, sortBy })
}

function visualizar(item: any) {
    get(`api/investimentos/${item.id}`, {})
    .then(res => {
        investimento.value = res.data
        dialog_investimento.value = true
    })
}
</script>
<template>
    <v-row>
        <v-col>
            <v-data-table-server v-model:items-per-page="props.investimentos.per_page" :headers="headers"
                :items="props.investimentos.data" :items-length="totalItems" :loading="loading" item-value="name"
                @update:options="loadItems">
                <template v-slot:item.actions="{ item }">
                    <v-icon size="small" @click="visualizar(item)">
                        mdi-eye
                    </v-icon>                    
                </template>
            </v-data-table-server>
        </v-col>
    </v-row>
    
    <CardInfoInvestimento v-if="investimento" v-model:dialog_investimento="dialog_investimento" :investimento="investimento" ></CardInfoInvestimento>

</template>