<script setup lang="ts">
</script>
<template>
    <v-navigation-drawer permanent>
        <v-list-item>
            <img src="@/assets/images/LogoSVG.svg" class="mt-5 mb-5" />
        </v-list-item>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="Thyago Lopes"></v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/auth/investimentos" title="Investimentos"></v-list-item>
        <v-list-item to="/auth/resumo-negociacao" title="Resumo de negociação"></v-list-item>
        <v-list-item link title="Proventos"></v-list-item>
        <v-list-item link title="Sair"></v-list-item>
    </v-navigation-drawer>
</template>

<style scoped lang="scss">
img {
    width: 200px;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>