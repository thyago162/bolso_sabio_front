<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
    labels: ['2022', '2023', '2024'],
    datasets: [ { data: [40, 20, 12] } ]
}
const chartOptions = {
    responsive: true
}
</script>
<template>
     <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
</template>