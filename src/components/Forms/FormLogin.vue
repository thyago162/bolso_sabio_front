<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { login, get } from "@/services/api"
import { useAuthStore } from '@/stores/auth';

//VARIÁVEIS
const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()


//FUNÇÕES
function realizarLogin() {
  login('oauth/token', {
      grant_type:  'password',
      client_id: '2',
      client_secret: 'a9dGEnNdn4HHa82xr2g1s4eBRfrPvBZyLFHkWwmh',
      username: email.value,
      password: password.value,
  }).then(response => {
    authStore.setAuth(response.data)
    usuarioAutenticado()
  })
}

async function usuarioAutenticado() {
  console.log(sessionStorage.getItem('token'))
  const response = await get('api/usuario-autenticado', {})
  if (response.status === 200) {
    authStore.setUser(response.data)
    router.push({name: 'auth-index'})
  }
}

</script>

<template>
  <div class="form">
    <div class="logo">
      <img src="@/assets/images/LogoSVG.svg" alt="logo" />
    </div>
    <h1><span class="quadrado">L</span>ogin</h1>
    <v-form class="mt-5">
      <v-text-field v-model="email" :counter="50" label="Email" required hide-details class="input"
        type="email"></v-text-field>

      <v-text-field v-model="password" :counter="32" label="Senha" required hide-details type="password"></v-text-field>
      <div class="submenu mt-5">
        <v-btn type="submit" color="indigo" density="comfortable" @click="realizarLogin" width="250px">Entrar</v-btn>
        <router-link to="/" class="ml-5">Esqueceu a senha?</router-link>
      </div>
      <v-btn block class="mt-5" size="x-large" rounded="lg"  @click="$emit('chamarCadastro', 'cadastro')">CADASTRAR-SE</v-btn>
    </v-form>
  </div>
</template>

<style scoped lang="scss">
.form {
  padding: 2rem;
  opacity : 0.7;

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
    color: rgb(71, 88, 182);
  }

  .submenu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      max-width: 250px;
    }
  }

  .logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 2%;
    }

}
</style>