<script setup lang="ts">
import { ref } from 'vue'
import {cadastrar} from '@/services/api'
import Alerta from '@/components/Alerta/Alerta.vue'
import { useRouter } from 'vue-router'
import {
  nomeCompletoRules, 
  emailRules,
  cpfRules,
  dddRules,
  telefoneRules,
  passwordRules
} from '@/composables/Cadastro/CadastroRules'

const form = ref({
  nome_completo: '',
  email: '',
  cpf: '',
  ddd: '',
  telefone: '',
  password: '',
  password_confirmed: ''
})
const router = useRouter()
const color = ref('')
const icon = ref('')
const title = ref('')
const text = ref('')
const show_alert = ref(false)
const show_pass = ref(false)
const show_pass_confirm = ref(false)

async function realizarCadastro() {
  const payload = {
    nome_completo: form.value.nome_completo,
    cpf: form.value.cpf,
    email: form.value.email,
    ddd: form.value.ddd,
    telefone: form.value.telefone,
    password_confirmed: form.value.password,
    password_confirmed_confirmation: form.value.password_confirmed
  }
  
  const response = await cadastrar('cadastrar', payload)
  if (response.status >= 400) {
    color.value = 'error'
    icon.value = '$error'
    title.value = 'Cadastro não realizado',
    text.value = 'Erro interno'
    show_alert.value = true
  } else {
    color.value = 'success'
    icon.value = '$success'
    title.value = 'Cadastro realizado com sucsso',
    text.value = 'Seu cadastro foi realizado com sucesso'
    show_alert.value = true
    
    await new Promise(r => setTimeout(r, 2000));
    router.push({name: 'index'})
  }
}

</script>

<template>
  <div class="form mt-5">
    <h1>Cadastre-se</h1>
    <alerta v-if="show_alert" :color="color" :icone="icon" :title="title" :text="text"></alerta>
    <v-form class="mt-5 mx-auto" @submit.prevent="realizarCadastro()">
      <v-text-field 
        v-model="form.nome_completo" 
        :rules="nomeCompletoRules" 
        :counter="50" 
        label="Nome Completo" 
        required 
        class="input"
      ></v-text-field>

      <v-text-field 
        v-model="form.email" 
        :rules="emailRules" 
        :counter="50" 
        label="Email" 
        required 
        class="input" 
        type="email"
      ></v-text-field>

      <v-text-field 
        v-model="form.cpf" 
        :counter="11" 
        :rules="cpfRules" 
        label="Cpf" 
        required
        hint="Apenas números"
      ></v-text-field>
      <v-row>
        <v-col cols="4">
          <v-text-field 
            v-model="form.ddd" 
            :rules="dddRules" 
            :counter="2" 
            label="DDD" 
            required 
            class="input"
            hint="Apenas números"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field 
            v-model="form.telefone" 
            :rules="telefoneRules" 
            :counter="9" 
            label="Número Telefone" 
            required
            class="input"
            hint="Apenas números"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-text-field 
        v-model="form.password" 
        :rules="passwordRules" 
        :counter="32" 
        label="Senha" 
        required 
        :type="show_pass ? 'text' : 'password'"
        class="input"
        :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show_pass = !show_pass"
      ></v-text-field>

      <v-text-field 
        v-model="form.password_confirmed" 
        :rules="passwordRules" 
        :counter="32" 
        label="Confirmar Senha" 
        required 
        :type="show_pass_confirm ? 'text' : 'password'"
        :append-icon="show_pass_confirm ? 'mdi-eye' : 'mdi-eye-off'"
        class="input"
        @click:append="show_pass_confirm = !show_pass_confirm"
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