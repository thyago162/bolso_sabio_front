<script setup lang="ts">
import CardInvestimento from '@/components/Card/CardInvestimento.vue'
import InfoImportacao from '@/components/Info/InfoImportacao.vue'
import { get, create } from '@/services/api'
import { ref } from 'vue'

//data
const dialog_delete = ref()
const dialog = ref()
const file = ref()
const tipo_exibicao = ref('card')
const investimentos = ref()
const loaded_data = ref(0)
const loading = ref(false)

//ciclos de vida

buscarInvestimentos()

//functions
function buscarInvestimentos() {
  get('api/investimentos', { tipo_exibicao: tipo_exibicao.value })
    .then(response => {
      investimentos.value = response.data
    }).catch(err => {
      alert(err.response)
    })
}

function importar() {
  loading.value = true
  let formData = new FormData();
  formData.append('investimentos', file.value[0], file.value[0].name)
  create('api/investimentos', formData)
    .then(() => {
      buscarInvestimentos()
      loading.value = false
      loaded_data.value = 0
      dialog.value = false
    }).catch(err => {
      alert(err.response.data)
    })
}

function visualizar() { }
function fechar() {
  dialog.value = false
}

</script>

<template>
  <v-container>
    <v-row class="mt-3">
      <v-col offset="2" cols="6">
        <h2>Meus investimentos</h2>
      </v-col>
      <v-col offset="2" cols="2">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn width="500px" dark color="blue-darken-1" v-bind="props">IMPORTAR</v-btn>
          </template>
          <v-card>
            <v-card-title>Importação de ativos</v-card-title>
            <v-card-text>
              <info-importacao tipo_importacao="Custódia"></info-importacao>
              <form enctype="multipart/form-data">
                <v-file-input label="Clique ou arraste" density="compact" v-model="file" class="mt-5"></v-file-input>
                <div v-if="loading">
                  <div class="text-center">
                    <span v-if="loading == true">Importando...</span>
                    <span v-else>Importado com sucesso</span>
                  </div>
                  <div class="text-center">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                  </div>
                </div>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="fechar"> Fechar </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="importar">
                Importar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col offset="2">
        <v-icon class="me-2">mdi-table</v-icon>
        <v-icon class="me-2">mdi-menu</v-icon>
        <v-icon class="me-2">mdi-filter</v-icon>
      </v-col>
    </v-row>
    <v-row v-if="investimentos && investimentos.length > 0">
      <v-col>
        <card-investimento 
          @click="visualizar" 
          v-for="investimento in investimentos" :key="investimento.id"
          :nome_ativo="investimento.descricao" 
          :tipo_investimento="investimento.tipo_investimento.nome"
          :qnt_adquirida="investimento.quantidade" 
          :saldo="investimento.valor_bruto"
          :categoria="investimento.categoria ? investimento.categoria.nome : ''" 
          :tipo_renda="investimento.tipo_investimento.tipo_renda"
          :vencimento="investimento.vencimento"
        ></card-investimento>
      </v-col>
    </v-row>
    <v-row v-else class="mt-5">
      <p>Nenhum dado encontrado...</p>
    </v-row>
    <v-dialog v-model="dialog_delete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Tem certeza que deseja remover?</v-card-title>
        <v-card-actions class="remover">
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text">Cancelar</v-btn>
          <v-btn color="blue-darken-1" variant="text">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
