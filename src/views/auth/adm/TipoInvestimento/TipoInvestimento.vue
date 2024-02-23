<script setup lang="ts">
import { ref, type ComputedRef, computed, nextTick } from 'vue';
import { headers, getAll, salvarRegistro } from '@/composables/TipoInvestimento/TipoInvestimento'
import { onBeforeMount } from 'vue';
import FormTipoInvestimento from '@/components/Forms/FormTipoInvestimento.vue'

const loading = ref(false)
const itemsPerPage = ref()
const tipos_investimento = ref()
const dialog = ref()
const dialog_delete = ref()
const index_editado = ref(0)
const tipo_investimento = ref()
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
    return index_editado.value === -1 ? 'Novo Item' : 'Editar Item'
});

onBeforeMount(async () => {
    tipos_investimento.value = await getAll(conf_inicial)
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
        index_editado.value = -1
    })
}

function closeDelete() {
    dialog_delete.value = false
    nextTick(() => {
        item_editado.value = Object.assign({}, item_padrao)
        index_editado.value = -1
    })
}

function deleteItemConfirm() {
    tipo_investimento.value.splice(index_editado, 1)
    closeDelete()
}

function editItem(item: any) {
    index_editado.value = item.id
    item_editado.value = Object.assign({}, item)
    dialog.value = true
}

function deleteItem(item: any) {
    index_editado.value = tipo_investimento.value.id
    item_editado.value = Object.assign({}, item)
    dialog_delete.value = true
}

function resetar() {
    item_editado.value = item_padrao
}

async function save() {
    console.log(item_editado.value)
    await salvarRegistro(item_editado.value)
    close()
}

</script>
<template>
    <v-container style="margin-top: 120px">
        <v-row style="margin-top: 10px;">
            <v-card width="1200" v-if="tipos_investimento">
                <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers"
                    :items-length="tipos_investimento.meta.total" :items="tipos_investimento.data" :loading="loading"
                    @update:options="loadItems">
                    <template v-slot:top>
                        <v-toolbar flat color="indigo">
                            <v-toolbar-title>Tipos Investimentos</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ props }">
                                    <v-btn  dark class="mb-2" v-bind="props">
                                        {{ form_title }}
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">Novo item</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <FormTipoInvestimento v-model:nome="item_editado.nome" v-model:tipoRenda="item_editado.tipo_renda" />
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-darken-1" variant="text" @click="close">
                                            Cancel
                                        </v-btn>
                                        <v-btn color="blue-darken-1" variant="text" @click="save">
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialog_delete" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
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
                  
                </v-data-table>
            </v-card>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
.titulo-modal {
    color: 'white'
}
</style>