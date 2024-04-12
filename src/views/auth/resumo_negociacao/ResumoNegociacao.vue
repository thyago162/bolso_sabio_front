<script setup lang="ts">
import InfoImportacao from '@/components/Info/InfoImportacao.vue'
import CardResumoNegociacao from '@/components/Card/CardResumoNegociacao.vue'
import { get, create } from '@/services/api'
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import notificar from '@/services/notificar';
import { vMaska } from "maska";
import masks from '@/composables/Masks/masks'

const dialog = ref()
const loading = ref(false)
const dialog_delete = ref()
const file = ref()
const resumo_negociacoes = ref()
const tipo_investimentos = ref()
const investimentos = ref()
const anos = ref()
const selected = ref('')
const tab = ref(1)
const tipo_acao = ref('compra')
const form = ref({
  tipo_investimento_id: '',
  investimento_id: '',
  total_comprado: 0,
  total_vendido: 0,
  qnt_cotas_comprada: 0,
  qnt_cotas_vendida: 0,
  valor_ativo: 0,
  data_negociacao: ''
})

//functions
onBeforeMount(() => {
  buscarAnos()
  getTipoInvestimento()
})


function buscarAnos() {
  get('api/resumo-negociacao/anos', {})
    .then(response => {
      anos.value = response.data
    })
}

function buscarResumoNegociacao(ano: string) {
  selected.value = ano
  get('api/resumo-negociacao', { ano: selected.value })
    .then(res => {
      resumo_negociacoes.value = res.data
    }).catch(err => {
      notificar('error', err.response.data.message)
    })
}

function getTipoInvestimento() {
  get('api/tipo-investimento', { tipo_renda: 'Variável' })
    .then(res => {
      tipo_investimentos.value = res.data
    })
    .catch(err => {
      notificar('error', err.response.data.message)
    })
}

function fechar() {
  dialog.value = false
}

function executar() {
  loading.value = true
  if (tab.value === 1) {
    salvar()
  } else {
    importar()
  }
  
  buscarAnos()
}

function salvar() {
  create('api/resumo-negociacao', form.value)
    .then(res => {
      loading.value = false
      dialog.value = false
      notificar('success', 'Registro salvo com sucesso')
    }).catch(err => {
      notificar('error', err.response.data.message)
    })
}

function importar() {
  let formData = new FormData
  formData.append('resumo_negociacao', file.value[0], file.value[0].name)
  create('api/resumo-negociacao/importar', formData)
    .then(() => {
      loading.value = false
      dialog.value = false
      notificar('success', 'Importação concluída')
    }).catch(err => {
      notificar('error', err.response.data.message)
    })
}

function buscarInvestimento(tipo_investimento_id: any) {
  form.value.tipo_investimento_id = tipo_investimento_id
  get('api/investimentos', { tipo_exibicao: 'card', tipo_investimento_id: form.value.tipo_investimento_id })
    .then(res => {
      investimentos.value = res.data
    })
    .catch(err => {
      notificar('error', err.response.data.message)
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
            <v-btn width="500px" dark color="blue-darken-1" v-bind="props">NOVO</v-btn>
          </template>
          <v-card>
            <v-card-title>Resumo de negociações</v-card-title>
            <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
              <v-tab :value="1">Novo</v-tab>
              <v-tab :value="2">Importar</v-tab>
            </v-tabs>
            <v-window v-if="tab == 1" class="mt-5">
              <v-card-text>
                <v-form>
                  <v-radio-group v-model="tipo_acao" inline>
                    <v-radio label="Compra" value="compra"></v-radio>
                    <v-radio label="Venda" value="venda"></v-radio>
                  </v-radio-group>
                  <v-select v-if="tipo_investimentos" label="Tipos Investimentos" :item-title="'nome'"
                    :item-value="'id'" :items="tipo_investimentos" variant="underlined"
                    @update:modelValue="buscarInvestimento"></v-select>
                  <section v-if="investimentos">
                    <v-select label="Nome do ativo" v-model="form.investimento_id" variant="underlined"
                      :items="investimentos" :item-value="'id'" :item-title="'descricao'"></v-select>
                    <section v-if="tipo_acao == 'compra'">
                      <v-text-field label="Quantidade" v-model="form.qnt_cotas_comprada" type="number"></v-text-field>
                      <v-text-field v-maska:[masks.money] label="Preço de compra" v-model="form.valor_ativo"></v-text-field>
                    </section>
                    <section v-else>
                      <v-text-field label="Quantidade" v-model="form.qnt_cotas_vendida"></v-text-field>
                      <v-text-field v-maska:[masks.money] label="Preço de venda" v-model="form.valor_ativo"></v-text-field>
                    </section>
                    <v-text-field type="date" v-model="form.data_negociacao" density="comfortable" variant="underlined"
                      label="Data de negociação"></v-text-field>
                  </section>
                </v-form>
              </v-card-text>
            </v-window>
            <v-window v-else class="mt-5">
              <v-card-text>
                <info-importacao tipo_importacao="Resumo de negociações"></info-importacao>
                <form enctype="multipart/form-data">
                  <v-file-input label="Clique ou arraste" density="compact" v-model="file" class="mt-5"></v-file-input>
                  <div v-if="loading">
                    <div class="text-center">
                      <span v-if="loading == true">Importando...</span>
                    </div>
                    <div class="text-center">
                      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                    </div>
                  </div>
                </form>
              </v-card-text>
            </v-window>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="fechar"> Fechar </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="executar">
                Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row class="mt-6">
      <v-col offset="2" cols="6">
        <div class="buscar-resumo">
          <v-select :items="anos" density="comfortable" label="Selecione o ano" variant="underlined"
            @update:modelValue="buscarResumoNegociacao"></v-select>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col offset="2" v-if="selected">
        <h2>Ano base: {{ selected }}</h2>
      </v-col>
    </v-row>
    <v-row v-if="resumo_negociacoes">
      <v-col>
        <div v-for="resumo_negociacao in resumo_negociacoes" :key="resumo_negociacao.id">
          <CardResumoNegociacao :investimento_id="resumo_negociacao.investimento_id"
            :descricao="resumo_negociacao.descricao" :ano="resumo_negociacao.ano"
            :saldo_compras="resumo_negociacao.saldo_compras" :saldo_vendas="resumo_negociacao.saldo_vendas"
            :saldo_compra_cotas="resumo_negociacao.saldo_compra_cotas"
            :saldo_venda_cotas="resumo_negociacao.saldo_venda_cotas" :preco_medio="resumo_negociacao.preco_medio"
            :saldo="resumo_negociacao.saldo" :resumo_anos="resumo_negociacao.anos"></CardResumoNegociacao>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col offset="2">
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
  width: 200px;
  display: flex;
  flex-direction: row;

  button {
    margin-left: 5px;
  }
}
</style>