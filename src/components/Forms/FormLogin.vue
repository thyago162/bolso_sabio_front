<script setup lang="ts">
import { ref } from 'vue'
import {RouterLink} from 'vue-router'
import {get} from "@/services/api"

const email = ref('')
const password = ref('')

function login() {
  get('oauth/token', {
    
  })
}

</script>

<template>
  <div class="form mt-5">
    <h1><span>L</span>ogin</h1>
    <div class="quadrado"></div>
    <v-form class="mt-5">
      <v-text-field
        v-model="email"
        :counter="50"
        label="Email"
        required
        hide-details
        class="input"
        type="email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :counter="32"
        label="Senha"
        required
        hide-details
        type="password"
      ></v-text-field>
      <v-btn type="submit" color="indigo" variant="flat" block class="mt-4" @click="login">Entrar</v-btn>
      <router-link to="/">Esqueceu a senha?</router-link>
    </v-form>
  </div>
</template>

<style scoped lang="scss">
.form {
  padding: 2rem;
  span {
    color: white;
  }

  h1 {
    font-size: 40px;
  }

  .input {
    margin-top: 10px;
    margin-bottom: 15px;
  }

  .quadrado {
    border: 1px solid blue;
    width: 25px;
    height: 25px;
    background-color: indigo;
    margin-top: -40px;
    border-radius: 5px;
  }
}
</style>