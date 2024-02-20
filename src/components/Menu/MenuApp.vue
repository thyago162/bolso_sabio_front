<script setup lang="ts">
  import {RouterLink } from 'vue-router'
</script>
<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon>
        <router-link to="/">
          <img src="@/assets/images/LogoSVG.svg" alt="logo" />
        </router-link>
      </v-app-bar-nav-icon>
    </template>
    <template v-slot:append>
      <v-btn to="/tipo-investimento">Tipos investimentos</v-btn>
      <v-btn to="">Usuários</v-btn>
      <v-btn to="/dashboard">Dashboard</v-btn>
      <v-btn to="">Sair</v-btn>
    </template>
  </v-app-bar>
</template>
<style scoped lang="scss">
img {
  width: 150px;
  margin-left: 150px;
}
</style>
