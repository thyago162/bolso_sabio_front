<script setup lang="ts">
import { ref, onBeforeMount, nextTick, computed, type ComputedRef, watch  } from 'vue';
import { get } from '@/services/api'

const loading = ref(false)
const itemsPerPage = ref()
const headers = ref([
    {
        title: 'ID',
        aling: 'start',
        sortable: true,
        key: 'id'
    },
    {
        title: 'NOME',
        aling: 'start',
        sortable: false,
        key: 'nome_completo'
    },
    {
        title: 'EMAIL',
        aling: 'start',
        sortable: false,
        key: 'email'
    },
    {
        title: 'CPF',
        aling: 'start',
        sortable: false,
        key: 'cpf'
    },
    {
        title: 'TELEFONE',
        align: 'start',
        sortable: false,
        key: 'telefone'
    },
    {
        title: 'Actions',
        align: 'start',
        key: 'actions'
    }
])
const user = ref()
const url = 'users'
const conf_inicial = {
    page: 1,
    per_page: 10,
    sort: [{ key: 'id', order: 'asc' }]
}
const editedIndex = ref()
const dialog = ref()
const dialogDelete = ref()
const editedItem = ref({
    nome_completo: '',
    email: '',
    cpf: '',
    telefone: '',
})

const defaultItem = ({
    nome_completo: '',
    email: '',
    cpf: '',
    telefone: '',
})

function getAll(url: string, conf_inicial: any) {
    get(url, conf_inicial)
        .then(res => {
            user.value = res.data
        })
        .catch(err => {
            alert('eita leleu')
        })
}

function loadItems({ page, itemsPerPage, sortBy }: any) {
    loading.value = true
    getAll(url, { page: page, per_page: itemsPerPage, sort: sortBy })
    loading.value = false
}

onBeforeMount(async () => {
    await getAll(url, conf_inicial)
})

function editItem(item: any) {
    console.log(item)
    editedIndex.value = user.value.id
    editedItem.value = Object.assign({}, item)
    dialog.value = true
}

function deleteItem(item: any) {
    editedIndex.value = user.value.id
    editedItem.value = Object.assign({}, item)
    dialogDelete.value = true
}

function deleteItemConfirm() {
    user.value.splice(editedIndex, 1)
    closeDelete()
}

function close() {
    dialog.value = false
    nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem)
        editedIndex.value = -1
    })
}

function closeDelete() {
    dialogDelete.value = false
    nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem)
        editedIndex.value = -1
    })
}

function save() {
    if (editedIndex.value > -1) {
        Object.assign(user.value[editedIndex.value], editedItem.value)
    } else {
        user.value.push(editedItem.value)
    }
    close()
}

const form_title: ComputedRef<string> = computed(() => {
    return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
});

watch(dialog, async (val) => {
    val || close()
})

watch(dialogDelete, async (val) => {
    val || closeDelete()
})

</script>
<template>
    <v-container style="margin-top: 120px">
        <v-row style="margin-top: 10px;">
            <v-card width="1200" v-if="user">
                <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="user.data.meta.total"
                    :items="user.data.data" :loading="loading" @update:options="loadItems">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Usuários</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ props }">
                                    <v-btn color="primary" dark class="mb-2" v-bind="props">
                                        {{ form_title }}
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">Novo item</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.nome_completo"
                                                        label="Nome completo"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.cpf"
                                                        label="Cpf"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedItem.telefone"
                                                        label="Telefone"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
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
                            <v-dialog v-model="dialogDelete" max-width="500px">
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
                        <v-btn color="primary" @click="initialize">
                            Reset
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-row>
    </v-container>
</template>