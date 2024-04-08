<script setup lang="ts">
import {get} from '@/services/api'
import { useAuthStore } from '@/stores/auth';
import notificar from "@/services/notificar"
import { onBeforeMount } from 'vue';
import { ref } from 'vue';

//VARIÁVEOS
const authStore = useAuthStore()
const carteira = ref()

//CICLOS DE VIDA
onBeforeMount(() => {
    usuarioAutenticado()
    dadosCarteira()
})

function usuarioAutenticado() {
    get('api/usuario-autenticado', {})
    .then(res => {
        console.log(res.data)
        authStore.setUser(res.data)
    })
    .catch (err => {
        notificar('error', err.response.data)
    })
}

function dadosCarteira() {
    get('api/carteira', {})
    .then(res => {
        carteira.value = res.data
    })
}
</script>
<template>
    <v-container>
        <v-row class="mt-3" v-if="carteira">
            <v-col offset="2">
                <v-card>
                    <v-card-title>
                        Minha carteira: R$ {{Math.round(carteira).toFixed(2) }}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>