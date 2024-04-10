<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    investimento: {
        required: true,
        type: Object as any,
    },
})

const dialog_investimento:any = defineModel('dialog_investimento')

const rendimento = computed(() => {
  if (props.investimento) {
    return (parseFloat(props.investimento.valor_bruto) - parseFloat(props.investimento.valor_aplicado))
  }

  return 0
})

const lucro = computed(() => {
    if (props.investimento) {
        return (parseFloat(props.investimento.valor_bruto) - parseFloat(props.investimento.valor_aplicado)) / parseFloat(props.investimento.valor_aplicado)
    }

    return 0
})

</script>
<template>
   <v-dialog v-model="dialog_investimento" width="600" >
        <v-card v-if="props.investimento && props.investimento.tipo_investimento">
            <section v-if="props.investimento.administradora_investimento">
                
                <v-card-title>
                    <v-img width="50" :src="props.investimento.administradora_investimento.administradora.logo"></v-img>
                    <h4>{{ props.investimento.administradora_investimento.administradora.nome}}</h4>
                </v-card-title>
                <v-card-subtitle class="header-1">
                    <span>Cnpj: {{ props.investimento.administradora_investimento.administradora.cnpj }}</span>
                    <span>Site: {{ props.investimento.administradora_investimento.administradora.site }}</span>
                </v-card-subtitle>
                <v-divider class="mt-3"></v-divider>
            </section>
            <v-card-title><h4>{{ props.investimento.descricao }}</h4></v-card-title>
            <v-card-subtitle class="header-1">
                <span>{{ props.investimento.tipo_investimento.nome }}</span>
                <span>{{ props.investimento.categoria.nome }}</span>
                <span v-if="props.investimento.vencimento">Vence em: {{props.investimento.vencimento}}</span>
            </v-card-subtitle>
            <v-card-text v-if="props.investimento.tipo_investimento.tipo_renda == 'Fixa'">
                <p>Quantidade: {{ props.investimento.quantidade }} cotas</p>
                <p>Valor aplicado: R$ {{ props.investimento.valor_aplicado }}</p>
                <p>Valor bruto: R$ {{ props.investimento.valor_bruto }}</p>
                <p>Valor liquido: R$ {{ props.investimento.valor_liquido }}</p>
                <span >
                    Rendimento total 
                    <span :class="rendimento > 0 ? 'lucro' : 'prejuizo'" >
                        {{rendimento > 0 ? '+' : '-'}} {{ rendimento.toFixed(2) }}
                    </span> 
                </span>
                |
                <span :class="rendimento > 0 ? 'lucro' : 'prejuizo'">
                    
                    <v-icon size="sm" >
                            {{lucro > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
                        </v-icon>
                        {{ (lucro * 100).toFixed(2) }}%
                </span>
            </v-card-text>
            <v-card-text v-else>
                <p>Quantidade: {{ props.investimento.quantidade }} cotas</p>
                <p>Valor bruto: R$ {{ props.investimento.valor_bruto }}</p>
            </v-card-text>
        </v-card>
    </v-dialog>

</template>

<style scoped lang="scss">
    .header-1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between
    }

    .lucro {
        color: green;
    }

    .prejuizo {
        color: red;
    }
</style>