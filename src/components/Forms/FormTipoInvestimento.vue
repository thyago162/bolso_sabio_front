<script setup lang="ts">
const nome = defineModel('nome')
const tipo_renda = defineModel('tipoRenda')
</script>
<template>
    <v-form>
        <v-text-field label="Nome" v-model="nome"></v-text-field>
        <v-select label="Select" :items="['Fixa', 'Variavel']"  v-model="tipo_renda"></v-select>
    </v-form>
</template>