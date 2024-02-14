<script setup lang="ts">
import MenuLogin from '@/components/Menu/MenuLogin.vue'
</script>
<template>
  <menu-login></menu-login>
  <v-container fluid class="container">
    <v-row class="info-investimentos mt-4 ml-3">
      <v-col cols="3">
        <h1>Acompanhe seus <span>i</span>nvestimentos</h1>
      </v-col>
    </v-row>
    <v-row class="info-investimentos ml-3">
      <v-col cols="6">
        <h2>Gerencie e acompanhe seus investimentos financeiros de forma prática e eficiente</h2>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid class="info-graficos">
    <v-row>
      <v-col cols="4">
        <h2 class="ml-3">Análises detalhadas, gráficos e relatórios personalizados</h2>
      </v-col>
      <v-col cols="6" offset-lg="2">
        <img src="../assets//images/f1.jpg" alt="" srcset="" />
      </v-col>
    </v-row>
  </v-container>
  <v-container class="info-gestao">
    <v-row>
      <v-col cols="5">
        <h2 class="ml-3">
          Ideal para otimizar sua gestão financeira e alcançar seus objetivos de forma consistente
        </h2>
      </v-col>
      <v-col>
        <img src="../assets//images/f2.jpg" alt="" srcset="" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.container {
  margin-top: 62px;
  background-image: url('../assets/images/moedas2.png');
  width: 100%;
  display: block;
  background-size: cover;
  content: '';
  min-height: 65vh;
  h1 {
    font-size: 42px;
  }
  h2 {
    font-size: 28px;
  }
}

.info-investimentos {
  padding: 10px;
  span {
    color: #1976d2;
  }
}

.info-graficos {
  padding: 10px;
  border-bottom: 1px solid #c2c8ce;
  h2 {
    margin-top: 190px;
  }
}

.info-gestao {
  padding: 10px;
  border-bottom: 1px solid #c2c8ce;
  h2 {
    margin-top: 190px;
  }
}
</style>