<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import MenuLogin from '@/components/Menu/MenuLogin.vue';
import FormCadastro from '@/components/Forms/FormCadastro.vue'
</script>
<template>
  <menu-login></menu-login>
  <v-container fluid class="container-login">
    <v-row >
      <v-col cols="8" class="login-logo"></v-col>
      <v-col>
       <form-cadastro></form-cadastro>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.container-login {
  margin-top: 58px;
  background-color: rgb(253, 250, 250);

  .login-logo {
    background-image: url('@/assets/images/moedas.jpg');
    width: 100%;
    display: block;
    background-size: cover;
    content: '';
    min-height: 65vh;
  }
}
</style>