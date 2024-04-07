<script setup lang="ts">
import { ref } from 'vue'
import { cadastrar } from '@/services/api'
import { useRouter } from 'vue-router'
import notificar from '@/services/notificar'
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
const show_pass = ref(false)
const show_pass_confirm = ref(false)

function realizarCadastro() {
  const payload = {
    nome_completo: form.value.nome_completo,
    cpf: form.value.cpf,
    email: form.value.email,
    ddd: form.value.ddd,
    telefone: form.value.telefone,
    password: form.value.password,
    password_confirmation: form.value.password_confirmed
  }

  cadastrar('api/cadastrar', payload)
  .then(async () => {
    notificar('success', 'Cadastro realizado com sucesso, você será redirecionado')
    await new Promise(r => setTimeout(r, 2000));
    window.location.href = "http://localhost:5173";
  })
  .catch(err => {
    if (err.response.status === 422) {
      notificar('error', err.response.data.message)
    } else {
      notificar('error', err.response.data)
    }
  })
}

</script>

<template>
  <div class="form mt-2">
    <div class="logo">
      <img src="@/assets/images/LogoSVG.svg" alt="logo" />
    </div>
    <v-form class="mt-5 mx-auto" @submit.prevent="realizarCadastro()">
      <h1><span class="quadrado">C</span>adastre-se</h1>
      <v-text-field v-model="form.nome_completo" :rules="nomeCompletoRules" :counter="50" label="Nome Completo" required
        class="input"></v-text-field>

      <v-text-field v-model="form.email" :rules="emailRules" :counter="50" label="Email" required class="input"
        type="email"></v-text-field>

      <v-text-field v-model="form.cpf" :counter="11" :rules="cpfRules" label="Cpf" required
        hint="Apenas números"></v-text-field>
      <v-row>
        <v-col cols="4">
          <v-text-field v-model="form.ddd" :rules="dddRules" :counter="2" label="DDD" required class="input"
            hint="Apenas números"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="form.telefone" :rules="telefoneRules" :counter="9" label="Número Telefone" required
            class="input" hint="Apenas números"></v-text-field>
        </v-col>
      </v-row>

      <v-text-field v-model="form.password" :rules="passwordRules" :counter="32" label="Senha" required
        :type="show_pass ? 'text' : 'password'" class="input" :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show_pass = !show_pass"></v-text-field>

      <v-text-field v-model="form.password_confirmed" :rules="passwordRules" :counter="32" label="Confirmar Senha"
        required :type="show_pass_confirm ? 'text' : 'password'"
        :append-icon="show_pass_confirm ? 'mdi-eye' : 'mdi-eye-off'" class="input"
        @click:append="show_pass_confirm = !show_pass_confirm"></v-text-field>

      <v-btn type="submit" size="x-large"  color="indigo" variant="flat" block class="mt-4">Cadastrar-se</v-btn>
      <div class="mt-5">
        <v-btn size="x-large" block class="mt-4" @click="$emit('chamarLogin', 'login')">Login</v-btn>
      </div>
    </v-form>
  </div>
</template>

<style scoped lang="scss">
.form {
  padding: 2rem;
  opacity: 0.7;

  h1 {
    font-size: 40px;
  }

  .input {
    margin-top: 10px;
    margin-bottom: 15px;
  }

  .quadrado {
    color: rgb(71, 88, 182);
  }

  .logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2%;
  }

}
</style>