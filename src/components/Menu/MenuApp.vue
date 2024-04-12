<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

//VARIÁVEIS
const authStore = storeToRefs(useAuthStore())
const user: any = authStore.getUser
const router = useRouter()

function sair() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('autenticado')
    router.push({ name: 'auth' })
}
</script>
<template>
    <v-navigation-drawer permanent>
        <v-list>
            <v-list-item>
                <img src="@/assets/images/LogoSVG.svg" class="mt-5 mb-5" />
            </v-list-item>
            <v-list-item to="/auth/me">
                <v-icon size="x-large">mdi-account-circle</v-icon>
                <span class="ml-5">{{ user.nome_completo }}</span>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item to="/auth/carteira" title="Carteira"></v-list-item>
            <v-list-item to="/auth/investimentos" title="Investimentos"></v-list-item>
            <v-list-item to="/auth/resumo-negociacao" title="Resumo de negociação"></v-list-item>
            <v-list-item title="Proventos (Breve)"></v-list-item>
            <v-list-item title="Sábio bolso (Breve)"></v-list-item>
            <v-list-item link title="Sair" @click="sair"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <p class="versao">v.0.1.0</p>
          </div>
        </template>
    </v-navigation-drawer>
</template>

<style scoped lang="scss">
img {
    width: 200px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.versao {
   text-align: center;
}
</style>