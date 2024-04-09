<script setup lang="ts">
import CardInvestimento from '@/components/Card/CardInvestimento.vue'
import InfoImportacao from '@/components/Info/InfoImportacao.vue'
import { get, create } from '@/services/api'
import { ref } from 'vue'
import notificar from '@/services/notificar'
import TabelaInvestimentos from '@/components/Tabela/TabelaInvestimentos.vue'
import CardInfoInvestimento from '@/components/Card/CardInfoInvestimento.vue'
import { vMaska } from "maska";
import masks from '@/composables/Masks/masks'

//data
const dialog_delete = ref()
const dialog = ref()
const file = ref()
const tipo_exibicao = ref('tabela')
const investimentos = ref()
const loaded_data = ref(0)
const loading = ref(false)
const pagina = ref(1)
const per_page = ref(10)
const sort_by = ref([])
const tab = ref(1)
const form = ref({
  descricao: '',
  tipo_investimento: '',
  categoria: '',
  preco: 0,
  quantidade: 0,
  tipo_investimento_id: '',
  categoria_id: '',
  valor_bruto: 0,
  valor_liquido: 0,
  valor_investido: 0,
  vencimento: '',
  taxa_negociada: ''
})
const ativo = ref()
const tipo_renda = ref()
const tipos_investimento = ref([])
const investimento = ref()
const dialog_investimento = ref()

//ciclos de vida

buscarInvestimentos()

//functions
function buscarInvestimentos() {
  get('api/investimentos', {
    tipo_exibicao: tipo_exibicao.value,
    page: pagina.value,
    per_page: per_page.value,
    sortBy: sort_by.value
  })
    .then(response => {
      investimentos.value = response.data
    }).catch(err => {
      alert(err.response)
    })
}

function executar() {
  tab.value === 1 ? salvar() : importar()
}

function salvar() {
  loading.value = true
  form.value.valor_bruto = tipo_renda.value == 'fixa' ?
    form.value.valor_bruto :
    form.value.quantidade * form.value.preco
  create('api/investimentos', form.value)
    .then(() => {
      buscarInvestimentos()
      loading.value = false
      loaded_data.value = 0
      dialog.value = false
      notificar('success', 'Registro salvo com sucesso')
    }).catch(err => {
      notificar('error', err.response.data.message)
    })

  loading.value = false
}

function importar() {
  loading.value = true
  let formData = new FormData();
  formData.append('investimentos', file.value[0], file.value[0].name)
  create('api/investimentos/importar', formData)
    .then(() => {
      buscarInvestimentos()
      loaded_data.value = 0
      dialog.value = false
      notificar('success', 'Importação concluída')
    }).catch(err => {
      notificar('error', err.response.data.message)
    })

  loading.value = false
}

function visualizar(id: number) {
  get(`api/investimentos/${id}`, {})
    .then(res => {
        investimento.value = res.data
        dialog_investimento.value = true
    })
}

function fechar() {
  dialog.value = false
}

function alterarTipoVisualizacao(tipo: string) {
  tipo_exibicao.value = tipo
  buscarInvestimentos()
}

function atualizarTabela({ page, itemsPerPage, sortBy }: any) {
  pagina.value = page
  per_page.value = itemsPerPage
  sort_by.value = sortBy

  buscarInvestimentos()
}

function buscarAtivo() {
  get('api/investimentos/buscar-ativo', { descricao: form.value.descricao })
    .then(res => {
      ativo.value = res.data
      form.value.tipo_investimento = res.data.ativo.kind
      form.value.categoria = res.data.ativo.sector
      form.value.preco = res.data.ativo.price
      form.value.tipo_investimento_id = res.data.tipo_investimento_id
      form.value.categoria_id = res.data.categoria_id
    })
    .catch(err => {
      notificar('error', err.response.data.message)
    })
}

function getTiposInvestimento() {
  if (tipo_renda.value == 'fixa') {
    get('api/tipo-investimento', { tipo_renda: 'Fixa' })
      .then(res => {
        tipos_investimento.value = res.data
      })
      .catch(err => {
        notificar('error', err.response.data.message)
      })
  }
}

function getCategoria(tipo_investimento_id: any) {
  form.value.tipo_investimento_id = tipo_investimento_id
  get('api/categoria', { tipo_investimento_id: tipo_investimento_id })
      .then(res => {
        let categoria = res.data
        form.value.categoria_id = categoria.id
      })
      .catch(err => {
        notificar('error', err.response.data.message)
      })
}
</script>

<template>
  <v-container>
    <v-row class="mt-3">
      <v-col offset="1" offset-lg="2" cols="6">
        <h2>Meus investimentos</h2>
      </v-col>
      <v-col offset="2" offset-lg="2" cols="2">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn width="500px" dark color="blue-darken-1" v-bind="props">NOVO</v-btn>
          </template>
          <v-card>
            <v-card-title>Investimentos</v-card-title>
            <v-card-text>
              <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
                <v-tab :value="1">Novo</v-tab>
                <v-tab :value="2">Importar</v-tab>
              </v-tabs>
              <v-window v-if="tab == 1" class="mt-5">
                <v-form>
                  <v-radio-group v-model="tipo_renda" inline @input="getTiposInvestimento">
                    <v-radio label="Renda Fixa " value="fixa"></v-radio>
                    <v-radio label="Renda Variável" value="variavel"></v-radio>
                  </v-radio-group>
                  <div v-if="tipo_renda == 'fixa'">
                    <v-text-field v-model="form.descricao" density="comfortable" variant="underlined"
                      label="Descrição"></v-text-field>
                    <v-select v-if="tipos_investimento" :item-title="'nome'" :item-value="'id'" variant='underlined'
                      label="Tipo de investimento" :items="tipos_investimento"
                      @update:modelValue="getCategoria"></v-select>
                    <v-text-field v-model="form.taxa_negociada" density="comfortable" variant="underlined"
                      label="Taxa negociada"></v-text-field>
                    <v-text-field type="date" v-model="form.vencimento" density="comfortable" variant="underlined"
                      label="Vencimento"></v-text-field>
                    <v-text-field v-model="form.quantidade" density="comfortable" variant="underlined"
                      label="Quantidade" type="number"></v-text-field>
                    <v-text-field 
                      v-model="form.valor_investido" 
                      density="comfortable" 
                      variant="underlined"
                      label="Valor investido" 
                      v-maska:[masks.money]
                    ></v-text-field>
                    <v-text-field 
                      v-model="form.valor_bruto" 
                      density="comfortable" 
                      variant="underlined" 
                      label="Valor bruto" 
                      v-maska:[masks.money]
                    ></v-text-field>
                    <v-text-field 
                      v-model="form.valor_liquido" 
                      density="comfortable" 
                      variant="underlined"
                      label="Valor liquido" 
                      v-maska:[masks.money]
                    ></v-text-field>
                  </div>
                  <div v-else>
                    <v-text-field v-model="form.descricao" append-icon="mdi-magnify" density="comfortable"
                      variant="underlined" label="Nome do ativo" @click:append="buscarAtivo"></v-text-field>
                    <div v-if="ativo">
                      <v-text-field v-model="form.tipo_investimento" density="comfortable" variant="underlined"
                        label="Tipo de investimento" :readonly="true"></v-text-field>
                      <v-text-field v-model="form.categoria" density="comfortable" variant="underlined"
                        label="Categoria" :readonly="true"></v-text-field>
                      <v-text-field v-model="form.preco" density="comfortable" variant="underlined" label="Preço"
                        :readonly="true"></v-text-field>
                      <v-text-field v-model="form.quantidade" density="comfortable" variant="underlined"
                        label="Quantidade" type="number"></v-text-field>
                    </div>
                  </div>
                </v-form>
              </v-window>
              <v-window v-else>
                <info-importacao tipo_importacao="Custódia"></info-importacao>
                <v-form enctype="multipart/form-data">
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
                </v-form>
              </v-window>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="fechar"> Fechar </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="executar"> {{ tab == 1 ? 'Salvar'
          :
          'Importar' }} </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col offset="1" offset-lg="2">
        <v-icon class="me-2" @click="alterarTipoVisualizacao('tabela')">mdi-table</v-icon>
        <v-icon class="me-2" @click="alterarTipoVisualizacao('card')">mdi-menu</v-icon>
      </v-col>
    </v-row>
    <v-row v-if="investimentos">
      <v-col v-if="tipo_exibicao == 'card'">
        <card-investimento @click="visualizar(investimento.id)" v-for="investimento in investimentos" :key="investimento.id"
          :nome_ativo="investimento.descricao" :tipo_investimento="investimento.tipo_investimento.nome"
          :qnt_adquirida="investimento.quantidade" :valor_aplicado="investimento.valor_aplicado"
          :valor_bruto="investimento.valor_bruto" :valor_liquido="investimento.valor_liquido"
          :categoria="investimento.categoria ? investimento.categoria.nome : ''"
          :tipo_renda="investimento.tipo_investimento.tipo_renda"
          :vencimento="investimento.vencimento"></card-investimento>
      </v-col>
      <v-col offset-lg="2" v-else>
        <TabelaInvestimentos @paginar-tabela="atualizarTabela" :investimentos="investimentos"></TabelaInvestimentos>
      </v-col>
    </v-row>
    <v-row v-else class="mt-5">
      <v-col offset="1" offset-lg="2">
        <p>Nenhum dado encontrado...</p>
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
    
    <CardInfoInvestimento v-model:dialog_investimento="dialog_investimento" :investimento="investimento" v-if="investimento"></CardInfoInvestimento>
  </v-container>
</template>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
