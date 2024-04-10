<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { onBeforeMount, ref } from 'vue'
import { get } from '@/services/api'
import notificar from '@/services/notificar';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const data:any = ref({labels: [], datasets: []})

const chartOptions = {
    responsive: true,
}

onBeforeMount(()=> {
    buscarDados()
})

function buscarDados() {
    get('/api/carteira/total-por-ano', {})
    .then(res => {
        let dataset = res.data['datasets']
        data.value.labels = res.data['labels']
        for(let prop in dataset) {
            data.value.datasets.push(dataset[prop])
        }
        
    })
    .catch(err => {
        notificar('error', err.response.data.message)
    })
}
</script>
<template>
     <Bar
        v-if="data.labels.length > 0"
        id="my-chart-id"
        :options="chartOptions"
        :data="data"
    />
</template>