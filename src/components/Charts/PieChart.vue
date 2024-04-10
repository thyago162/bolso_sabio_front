<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { get } from '@/services/api'
import { onBeforeMount, ref } from 'vue'
import { Pie } from 'vue-chartjs'
import notificar from '@/services/notificar';

ChartJS.register(Tooltip, Legend)
ChartJS.register(ArcElement)
const data = ref({
  labels: [],
  datasets: [
    {
      backgroundColor: ['#FF8C00', '#8A2BE2', '#00FF7F', '#20B2AA', '#4682B4', '#A52A2A'],
      data: []
    }
  ]
})
const options = {
  responsive: true,
  maintainAspectRatio: false,
}

onBeforeMount(()=> {
    buscarDados()
})

function buscarDados() {
    get('/api/carteira/total-por-tipo-investimento', {})
    .then(res => {
        data.value.labels = res.data.label
        data.value.datasets[0].data = res.data.valores
    })
    .catch(err => {
        notificar('error', err.response.data.message)
    })
}
</script>
<template>
    <Pie v-if="data.labels.length > 0" :data="data" :options="options"></Pie>
    
</template>