<script setup lang="ts">
const props = defineProps({
    tipo_importacao: {
        required: true,
        type: String
    }
})

const custodia = [
    'Tipo de investimento',
    'Descricao',
    'Quantidade',
    'Valor aplicado',
    'Taxa negociada',
    'Valor Aplicado',
    'Valor Bruto',
    'Valor liquido'
]

const resumo_negociacao = [
    'Dt Negociação',
    'Ativo',
    'Preço',
    'Quantidade compra',
    'Quantidade venda',
    'Financeiro compra',
    'Financeiro venda'
]
</script>

<template>
    <section v-if="props.tipo_importacao == 'Custódia'">
        <h4>Atenção!</h4>
        <span>Para a importação dos ativos, é necessário que o csv tenha os seguintes campos:</span>
        <ul class="ml-5">
            <li v-for="item in custodia" :key="item">{{ item }}</li>
        </ul>
    </section>
    <section v-if="props.tipo_importacao == 'Resumo de negociações'">
        <span>Para a importação do resumo de negociação, é necessário que o csv tenha os seguintes campos:</span>
        <ul class="ml-5">
            <li v-for="item in resumo_negociacao" :key="item">{{ item }}</li>
        </ul>
    </section>

    <section v-if="props.tipo_importacao == 'Resumo de proventos'"></section>
    <span class="observacao">Obs: Caso tenha algum caractere quebrado, corriga antes de importar</span>
</template>

<style scoped lang="scss">
.observacao {
    color: red
}
</style>