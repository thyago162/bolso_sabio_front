<script setup lang="ts">
import { get } from "@/services/api"
import { onBeforeMount } from "vue";
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const investimento = ref()
const route = useRoute()

onBeforeMount(() => {
    buscarInvestimento()
})

function buscarInvestimento() {
    get(`api/investimentos/${route.params.id}`, {})
        .then(res => {
            investimento.value = res.data
        })
}
</script>
<template>
    <v-container v-if="investimento">
       <section class="card" v-if="investimento.administradora_investimento">
        <span>Administradora</span>
        <v-row>
            <v-col>
                <h3>{{ investimento.administradoraInvestimento.administradora.nome }}</h3>
            </v-col>
        </v-row>
       </section>
       <section class="card">
        <p>Informações sobre o ativo</p>
        <v-card-title>{{ investimento.descricao }}</v-card-title>       
        <v-card-subtitle>
            {{ investimento.tipo_investimento.nome }}
        </v-card-subtitle>
        <v-card-subtitle>
            {{ investimento.categoria.nome }}
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
            <p>Cotas: {{ investimento.quantidade }}</p>
            <p>Valor bruto: {{ investimento.valor_bruto }}</p>
        </v-card-text>

       </section>
    </v-container>
</template>

<style scoped lang="scss">
.card {
    padding: 5px;
    border: 1px solid lightgrey;

}
</style>