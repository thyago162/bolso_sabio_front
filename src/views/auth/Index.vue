<script setup lang="ts">
import MenuLateral from '@/components/Menu/MenuApp.vue'
import {RouterView } from 'vue-router'
</script>
<template>
    <menu-lateral></menu-lateral>
    <router-view></router-view>
</template>