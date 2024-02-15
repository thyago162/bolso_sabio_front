<script setup lang="ts">
import { ref } from 'vue'

const nome_completo = ref('')
const email = ref('')
const cpf = ref('')
const cod_telefone = ref('')
const num_telefone = ref('')
const password = ref('')
const password_confirmed = ref('')

</script>

<template>
  <div class="form mt-5">
    <h1>Cadastre-se</h1>
    <v-form class="mt-5">
      <v-text-field
        v-model="nome_completo"
        :counter="50"
        label="Nome Completo"
        required
        hide-details
        class="input"
      ></v-text-field>

      <v-text-field
        v-model="email"
        :counter="50"
        label="Email"
        required
        hide-details
        class="input"
        type="email"
      ></v-text-field>

      <v-text-field v-model="cpf" :counter="11" label="Cpf" required hide-details></v-text-field>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="cod_telefone"
            :counter="11"
            label="DDD"
            required
            hide-details
            class="input"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="num_telefone"
            :counter="11"
            label="Número Telefone"
            required
            hide-details
            class="input"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        v-model="password"
        :counter="32"
        label="Senha"
        required
        hide-details
        type="password"
        class="input"
      ></v-text-field>
      <v-text-field
        v-model="password_confirmed"
        :counter="32"
        label="Confirmar Senha"
        required
        hide-details
        type="password"
        class="input"
      ></v-text-field>
      <v-btn type="submit" color="indigo" variant="flat" block class="mt-4">Entrar</v-btn>
    </v-form>
  </div>
</template>

<style scoped lang="scss">
.form {
  padding: 2rem;

  h1 {
    font-size: 40px;
  }

  .input {
    margin-top: 10px;
    margin-bottom: 15px;
  }
}
</style>