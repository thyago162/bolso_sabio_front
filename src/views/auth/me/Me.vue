<script setup lang="ts">
import { get, create } from '@/services/api'
import notificar from "@/services/notificar"
import { onBeforeMount, ref } from 'vue'

const user: any = ref()
const form: any = ref({
    user: {},
    endereco: {}
})

const show_dados_pessoais = ref(false)
const show_endereco = ref(false)
const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF',
    'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS',
    'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]
const tipo_endereco = ['Rua', 'Avenida', 'Rodovia', 'Via', 'Bulevar', 'Beco']

onBeforeMount(() => {
    usuarioAutenticado()
})


function usuarioAutenticado() {
    get(`api/user/dados-usuario`, {})
        .then(res => {
            form.value.user = res.data
            form.value.enderco = res.data.user.endereco
        })
        .catch(err => {
            notificar('error', err.response.data.message)
        })
}

function salvar() {
    create('api/user', { user: user.value, endereco: form.endereco.value })
        .then(res => {
            notificar('success', 'Registro salvo com sucesso')
        })
        .catch(err => {
            notificar('error', err.response.data.message)
        })

}

</script>
<template>
    <v-container v-if="form.user">
        <v-row>
            <v-col offset="2">
                <h2 class="mt-5">Meus dados</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col offset="2" cols="8">
                <v-card>
                    <v-card-title>
                        <h4>Dados pessoais <v-icon @click="show_dados_pessoais = !show_dados_pessoais">{{
        show_dados_pessoais ? 'mdi-arrow-down-drop-circle' : 'mdi-arrow-up-drop-circle'
    }}</v-icon></h4>
                    </v-card-title>
                    <v-card-text v-if="show_dados_pessoais">
                        <v-row>
                            <v-col cols="3">
                                <v-text-field label="Nome" v-model="form.user.nome_completo"
                                    variant="underlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Email" v-model="form.user.email"
                                    variant="underlined"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="Cpf" v-model="form.user.cpf" readonly
                                    variant="underlined"></v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <v-text-field label="DDD" v-model="form.user.ddd" variant="underlined"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="Telefone" v-model="form.user.telefone"
                                    variant="underlined"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col offset="2" cols="8">
                <v-card>
                    <v-card-title>
                        <h4>Endereço<v-icon @click="show_endereco = !show_endereco">{{ show_endereco ?
        'mdi-arrow-down-drop-circle' : 'mdi-arrow-up-drop-circle' }}</v-icon></h4>
                    </v-card-title>
                    <v-card-text v-if="show_endereco">
                        <v-row>
                            <v-col cols="3">
                                <v-select :items="tipo_endereco" label="Tipo de logradouro" variant="underlined"
                                    v-model="form.endereco.tipo_endereco"></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Logradouro" variant="underlined"
                                    v-model="form.endereco.logradouro"></v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <v-text-field label="Número" variant="underlined"
                                    v-model="form.endereco.cep"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <v-text-field label="Complemento" variant="underlined"
                                    v-model="form.endereco.complemento"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field label="Bairro" variant="underlined"
                                    v-model="form.endereco.bairro"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field label="Cidade" variant="underlined"
                                    v-model="form.endereco.cidade"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-select :items="estados" label="Estado" variant="underlined"
                                    v-model="form.endereco.estado"></v-select>
                            </v-col>
                            <v-col cols="1">
                                <v-text-field label="Cep" variant="underlined"
                                    v-model="form.endereco.cep"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10" class="btn-salvar">
                <v-btn @click="salvar">SALVAR</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.btn-salvar {
    display: flex;
    flex-direction: row;
    justify-content: end
}
</style>