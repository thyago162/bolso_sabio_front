<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        required: true
    },
    icone: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
})
</script>

<template>
    <v-alert 
        :color="props.color" 
        :icon="props.icone" 
        :title="props.title"
        :text="props.text"
    ></v-alert>
</template>