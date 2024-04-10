<script setup lang="ts">
import {useRouter} from 'vue-router'
import { useAuthStore } from '@/stores/auth';

//VARIÁVEIS
const authStore = useAuthStore()
const user:any = authStore.getUser
const router = useRouter()

function sair() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('autenticado')
    router.push({name: 'auth'})
}
</script>
<template>
    <v-navigation-drawer permanent>
        <v-list-item>
            <img src="@/assets/images/LogoSVG.svg" class="mt-5 mb-5" />
        </v-list-item>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" :title="user.nome_completo"></v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/auth/carteira" title="Carteira"></v-list-item>
        <v-list-item to="/auth/investimentos" title="Investimentos"></v-list-item>
        <v-list-item to="/auth/resumo-negociacao" title="Resumo de negociação"></v-list-item>
        <v-list-item link title="Proventos (Breve)"></v-list-item>
        <v-list-item link title="Sair" @click="sair"></v-list-item>
    </v-navigation-drawer>
</template>

<style scoped lang="scss">
img {
    width: 200px;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>