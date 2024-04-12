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
      backgroundColor: [],
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
        data.value.datasets[0].backgroundColor = res.data.cores
    })
    .catch(err => {
        notificar('error', err.response.data.message)
    })
}
</script>
<template>
    <Pie v-if="data.labels.length > 0" :data="data" :options="options"></Pie>
    
</template>