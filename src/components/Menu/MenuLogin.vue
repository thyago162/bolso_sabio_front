<script setup lang="ts"></script>

<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon>
        <img src="@/assets/images/LogoSVG.svg" alt="logo" />
      </v-app-bar-nav-icon>
    </template>
    <template v-slot:append>
      <v-btn>Login</v-btn>
      <v-btn>Registrar</v-btn>
    </template>
  </v-app-bar>
</template>
<style scoped lang="scss">
img {
  width: 150px;
  margin-left: 150px;
}
</style>
