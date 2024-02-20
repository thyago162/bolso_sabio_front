<script setup lang="ts">
import { ref } from 'vue';
import { get } from '@/services/api'

const loading = ref(false)
const itemsPerPage = ref()
const headers = ref([
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
    }
])
const tipo_investimento = ref()
const url = 'tipos-investimento'
const conf_inicial = {
    page: 1,
    per_page: 10,
    sort: [{key: 'id', order: 'asc'}]
}

getAll(url, conf_inicial)

function getAll(url: string, conf_inicial: any) {
    get(url, conf_inicial)
        .then(res => {
            tipo_investimento.value = res.data
        })
        .catch(err => {
            alert('eita leleu')
        })
}

function loadItems ({ page, itemsPerPage, sortBy }: any) {
        loading.value = true
        getAll(url, {page: page, per_page: itemsPerPage, sort: sortBy})
        loading.value = false
}
</script>
<template>
    <v-container style="margin-top: 120px">
        <v-row>
            <v-col cols="10">
                <h1>Tipos Investimentos</h1>
            </v-col>
            <v-col align-self="center">
                <v-btn>Novo registro</v-btn>
            </v-col>
        </v-row>
        <v-row style="margin-top: 10px;">
            <v-card width="1200" v-if="tipo_investimento">
                <v-data-table-server 
                    v-model:items-per-page="itemsPerPage" 
                    :headers="headers" 
                    :items-length="tipo_investimento.data.meta.total"
                    :items="tipo_investimento.data.data"
                    :loading="loading"
                    @update:options="loadItems"
                ></v-data-table-server>
            </v-card>
        </v-row>
    </v-container>
</template>