<script setup lang="ts">

const props = defineProps({
    nome_ativo: {
        required: true,
        type: String
    },
    tipo_investimento: {
        required: true,
        type: String
    },
    qnt_adquirida: {
        required: true,
        type: Number
    },
    saldo: {
        required: true,
        type: Number
    },
    categoria: {
        required: true,
        type: String
    },
    tipo_renda: {
        required: true,
        type: String
    },
    vencimento: {
        required: true,
        type: String
    }
})
</script>

<template>
    <v-card class="mx-auto card mb-5" max-width="800">
        <v-row class="card-header">
            <v-col offset="1" cols="8">
                <v-card-title><b>{{ props.nome_ativo }}</b></v-card-title>
                <v-card-subtitle>Categoria: {{ categoria }}</v-card-subtitle>
              
            </v-col>
            <v-col>
                <v-card-title>{{ props.tipo_investimento }}</v-card-title>
            </v-col>
        </v-row>
        <v-row>
            <v-col offset="1">
                <v-card-text>
                    <p>Cotas: {{ qnt_adquirida }}</p>
                    <p><b>Saldo R$ </b>{{ saldo }}</p>
                </v-card-text>
            </v-col>
            <v-col>
                <v-card-text>
                    <p v-if="tipo_renda=='Fixa'">Vencimento: {{ vencimento }}</p>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped lang="scss">
    .card {
        padding: 5px;
        .card-header {
            background-color: rgb(45, 141, 141);
            color: #fff;
        }
    }
</style>