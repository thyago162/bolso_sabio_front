<script setup lang="ts">
import InfoImportacao from '@/components/Info/InfoImportacao.vue'
import CardResumoNegociacao from '@/components/Card/CardResumoNegociacao.vue'
import { get, create } from '@/services/api'
import { ref } from 'vue';
import { onBeforeMount } from 'vue';

const dialog = ref()
const loading = ref(false)
const dialog_delete = ref()
const file = ref()
const resumo_negociacoes = ref()
const anos = ref()
const selected = ref('')

//functions
onBeforeMount(() => {
  buscarAnos()
})


function buscarAnos() {
  get('api/resumo-negociacao/anos', {})
    .then(response => {
      anos.value = response.data
    })
}

function buscarResumoNegociacao() {
  if (selected.value) {
    get('api/resumo-negociacao', { ano: selected.value })
      .then(res => {
        resumo_negociacoes.value = res.data
      }).catch(err => {
        alert(err.response.data)
      })
  }
}
function fechar() { }
function importar() {
  let formData = new FormData
  formData.append('resumo_negociacao', file.value[0], file.value[0].name)
  create('api/resumo-negociacao', formData)
    .then(() => {
      loading.value = false
      dialog.value = false
      alert('Importação concluída')
    }).catch(err => {
      alert(err.response.data)
    })
}
</script>
<template>
  <v-container>
    <v-row class="mt-3">
      <v-col offset="2" cols="6">
        <h2>Meus resumos de negociação</h2>
      </v-col>
      <v-col offset="2" cols="2">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn width="500px" dark color="blue-darken-1" v-bind="props">IMPORTAR</v-btn>
          </template>
          <v-card>
            <v-card-title>Importar resumo de negociações</v-card-title>
            <v-card-text>
              <info-importacao tipo_importacao="Resumo de negociações"></info-importacao>
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
                Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row class="mt-6">
      <v-col offset="2">
        <div class="buscar-resumo">
          <v-select :items="anos" density="comfortable" label="Selecione o ano" variant="underlined" v-model="selected"></v-select>
          <v-btn icon  @click="buscarResumoNegociacao">
             <v-icon>mdi-account-search</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col offset="2">
        <v-icon class="me-2">mdi-table</v-icon>
        <v-icon class="me-2">mdi-menu</v-icon>
        <v-icon class="me-2">mdi-filter</v-icon>
      </v-col>
    </v-row>
    <v-row>
      <v-col offset="2">
        <h2>Ano base: {{ selected }}</h2>
      </v-col>
    </v-row>
    <v-row v-if="resumo_negociacoes">
      <v-col>
        <div v-for="resumo_negociacao in resumo_negociacoes" :key="resumo_negociacao.id">
          <CardResumoNegociacao 
            :investimento_id="resumo_negociacao.investimento_id"
            :descricao="resumo_negociacao.descricao"
            :ano="resumo_negociacao.ano"
            :saldo_compras="resumo_negociacao.saldo_compras"
            :saldo_vendas="resumo_negociacao.saldo_vendas"
            :saldo_compra_cotas="resumo_negociacao.saldo_compra_cotas"
            :saldo_venda_cotas="resumo_negociacao.saldo_venda_cotas"
            :preco_medio="resumo_negociacao.preco_medio"
            :saldo="resumo_negociacao.saldo"
            :resumo_anos="resumo_negociacao.anos"
          ></CardResumoNegociacao>
        </div>

      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>Nenhum dado a ser exibido.</p>
      </v-col>
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

<style scoped lang="scss">
  .buscar-resumo {
    display: flex;
    flex-direction: row;
    button {
      margin-left: 5px;
    }
  }
</style>