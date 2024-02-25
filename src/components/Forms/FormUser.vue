<script setup lang="ts">
const nome_completo = defineModel('nome_completo')
const cpf = defineModel('cpf')
const email = defineModel('email')
const telefone = defineModel('telefone')
</script>

<template>
    <v-form>
        <v-text-field label="Nome completo" v-model="nome_completo"></v-text-field>
        <v-text-field label="Email" v-model="email"></v-text-field>
        <v-text-field label="cpf" v-model="cpf" v-mask="'###.###.###-##'"></v-text-field>
        <v-text-field label="Telefone" v-model="telefone" v-mask="'####-####'"></v-text-field>
    </v-form>
</template>