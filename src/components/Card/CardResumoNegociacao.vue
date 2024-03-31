<script setup lang="ts">
import { ref } from 'vue'
import { get } from "@/services/api"
import {type ResumoAnos} from "@/models/ResumoAnos"

const props = defineProps({
    investimento_id: {
        required: true,
        type: Number
    },
    descricao: {
        required: true,
        type: String
    },
    ano: {
        required: true,
        type: String
    },
    saldo_compras: {
        required: true,
        type: Number
    },
    saldo_vendas: {
        required: true,
        type: Number
    },
    saldo_compra_cotas: {
        required: true,
        type: Number,
    },
    saldo_venda_cotas: {
        required: true,
        type: Number
    },
    preco_medio: {
        required: true,
        type: Number
    },
    saldo: {
        required: true,
        type: Number
    },
    resumo_anos: {
        required: true,
        type: Array<ResumoAnos>
    }
})
const show_view = ref(false)
const show_relatorio = ref(false)
const relatorio = ref('')
const dialog_relatorio = ref(false)
const investimento_administradora = ref()

//functions
function gerarRelatorio() {
    get(`api/administradora/${props.investimento_id}`, {})
    .then(response => {
        let total_em_cotas = props.saldo_compra_cotas - props.saldo_venda_cotas
        investimento_administradora.value = response.data
        relatorio.value = `Total de ${total_em_cotas} cotas com preço médio de ${props.preco_medio} R$. 
        Investimento total de  ${props.saldo} R$ sob a custódia de ${investimento_administradora.value.administradora.nome}
        no cnpj ${investimento_administradora.value.administradora.cnpj}`
        dialog_relatorio.value = true
    })

}

</script>
<template>
    <v-card class="mx-auto mb-5" max-width="800">
        <v-row class="card-header">
            <v-col cols="10">
                <v-card-title>
                    <b>{{ props.descricao }}</b>
                </v-card-title>
            </v-col>
            <v-col>
                <v-card-title>FII</v-card-title>
            </v-col>
        </v-row>
        <v-row class="mt-5">
            <v-col offset="1" v-for="(ano_base, index) in props.resumo_anos" :key="index">
                <v-card-subtitle>Ano base: {{ ano_base.ano }}</v-card-subtitle>
                <v-card-text>
                    <p>Total em compras: {{ ano_base.total_comprado }}</p>
                    <p>Total em vendas: {{ ano_base.total_vendido }}</p>
                    <p>Total de cotas adquiridas: {{ ano_base.qnt_cotas_comprada }}</p>
                    <p>Total de cotas vendida: {{ ano_base.qnt_cotas_vendida }}</p>
                    <p>Preço médio: {{ ano_base.preco_medio }}</p>
                </v-card-text>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="saldos">
                <v-card-text>Saldo compras: R$ {{ props.saldo_compras }}</v-card-text>
                <v-card-text>Saldo vendas: R$ {{ props.saldo_vendas }}</v-card-text>
                <v-card-text>Saldo cotas compradas: {{ props.saldo_compra_cotas }}</v-card-text>
                <v-card-text>Saldo cotas vendidas: {{ props.saldo_venda_cotas }}</v-card-text>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class='card-footer'>
            <v-col offset="5">
                <v-card-text>
                    <v-tooltip v-model="show_view" location="top">
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props"  >
                                <v-icon color="grey-lighten-1">
                                    mdi-eye
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Visualizar todas as notas de negociação</span>
                    </v-tooltip>
                    <v-tooltip v-model="show_relatorio" location="top">
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props" class="ml-2" @click="gerarRelatorio">
                                <v-icon color="grey-lighten-1" class="m-2">
                                    mdi-laptop
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Gerar relatório para o imposto de renda</span>
                    </v-tooltip>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
    <v-dialog
      v-model="dialog_relatorio"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-laptop"
        :text="relatorio"
        title="Relatório para o imposto de renda"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="dialog_relatorio = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">
.card-header {
  background-color: rgb(54, 145, 231);
  color: white;
}

.saldos {
    display: flex;
    flex-direction: row;
}
</style>