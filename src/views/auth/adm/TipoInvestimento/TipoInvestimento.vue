<!-- eslint-disable vue/valid-v-slot -->
<script setup lang="ts">
import { ref, type ComputedRef, computed, nextTick } from 'vue';
import { 
    headers, 
    getAll, 
    salvarRegistro, 
    atualizarRegistro, 
    removerRegistro 
} from '@/composables/TipoInvestimento/TipoInvestimento'
import { onBeforeMount } from 'vue';
import FormTipoInvestimento from '@/components/Forms/FormTipoInvestimento.vue'
import { useTipoInvestimentoStore } from '@/stores/tipo-investimento';
import { useAlertaStore } from '@/stores/alerta'
import { storeToRefs } from 'pinia';
import Alerta from '@/components/Alerta/Alerta.vue';

const tipo_investimento_store = storeToRefs(useTipoInvestimentoStore())
const alerta_store = storeToRefs(useAlertaStore())
const alerta = alerta_store.getAlerta
const tipos_investimento = tipo_investimento_store.getTiposInvestimento
const loading = ref(false)
const itemsPerPage = ref(10)
const dialog = ref()
const dialog_delete = ref()
const index = ref(0)
const item_editado = ref({
    nome: '',
    tipo_renda: 'Fixa'
})
const item_padrao = {
    nome: '',
    tipo_renda: 'Fixa'
}
const conf_inicial = {
    page: 1,
    per_page: 10,
    sort: [{ key: 'id', order: 'asc' }]
}

const form_title: ComputedRef<string> = computed(() => {
    return index.value === 0 ? 'Novo Item' : 'Editar Item'
});

onBeforeMount(() => {
    getAll(conf_inicial)
})

function loadItems({ page, itemsPerPage, sortBy }: any) {
    loading.value = true
    getAll({ page: page, per_page: itemsPerPage, sort: sortBy })
    loading.value = false
}

function close() {
    dialog.value = false
    nextTick(() => {
        item_editado.value = Object.assign({}, item_padrao)
        index.value = 0
    })
}

function closeDelete() {
    dialog_delete.value = false
    nextTick(() => {
        item_editado.value = Object.assign({}, item_padrao)
        index.value = 0
    })
}

function deleteItemConfirm() {
    removerRegistro(index.value)
    closeDelete()
}

function editItem(item: any) {
    index.value = item.id
    item_editado.value = Object.assign({}, item)
    dialog.value = true
}

function deleteItem(item: any) {
    index.value = item.id
    item_editado.value = Object.assign({}, item)
    dialog_delete.value = true
}

function resetar() {
    item_editado.value = item_padrao
}

async function save() {
    salvarRegistro(item_editado.value)
    close()
}

async function update() {
    atualizarRegistro(item_editado.value, index.value)
    close()
}

</script>
<template>
    <v-container style="margin-top: 100px">
        <v-row style="margin-top: 10px;" v-if="tipos_investimento.data">
                <Alerta v-if="alerta.show"  :color="alerta.color" :icone="alerta.icon" :title="alerta.title" :text="alerta.text"></Alerta>
                <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers"
                    :items-length="tipos_investimento.meta.total" :items="tipos_investimento.data" :loading="loading"
                    @update:options="loadItems" class="mt-3">
                    <template v-slot:top>
                        <v-toolbar flat color="indigo">
                            <v-toolbar-title>Tipos Investimentos</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ props }">
                                    <v-btn  dark class="mb-2" v-bind="props">
                                        Novo item
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">{{ form_title }}</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <FormTipoInvestimento v-model:nome="item_editado.nome" v-model:tipoRenda="item_editado.tipo_renda" />
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-darken-1" variant="text" @click="close">
                                            Cancelar
                                        </v-btn>
                                        <v-btn color="blue-darken-1" variant="text" @click="save" v-if="index === 0">
                                            Salvar
                                        </v-btn>
                                        <v-btn color="blue-darken-1" variant="text" @click="update" v-if="index > 0">
                                            Atualizar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialog_delete" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5">Tem certeza que deseja remover?</v-card-title>
                                    <v-card-actions class="remover">
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
                                        <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon size="small" class="me-2" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon size="small" @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="resetar">
                            Reset
                        </v-btn>
                    </template>
                  
                </v-data-table-server>
            
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
.titulo-modal {
    color: 'white'
}
</style>