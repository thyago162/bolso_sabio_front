<script setup lang="ts">
import { get } from '@/services/api'
import { useAuthStore } from '@/stores/auth';
import notificar from "@/services/notificar"
import { onBeforeMount } from 'vue';
import { ref } from 'vue';
import BarChart from '@/components/Charts/BarChart.vue';
import PieChart from '@/components/Charts/PieChart.vue'

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
        .catch(err => {
            notificar('error', err.response.data.message)
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
        <v-row class="mt-5">
            <v-col offset="2" cols="9">
                <v-card class="mx-auto">
                    <v-row>
                        <v-col >
                            <v-card-title>
                                <h4 class="carteira">Minha carteira: R$ {{ Math.round(carteira).toFixed(2) }}</h4>
                            </v-card-title>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <pie-chart></pie-chart>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <bar-chart></bar-chart>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.carteira {
    text-align: start;
    margin-left: 30px;
}
</style>