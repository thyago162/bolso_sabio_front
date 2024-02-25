<script setup lang="ts">
import { ref, onBeforeMount, nextTick, computed, type ComputedRef, watch  } from 'vue';
import {headers} from '@/composables/User/User'
import { get } from '@/services/api'
import FormUser from '@/components/Forms/FormUser.vue';

const loading = ref(false)
const itemsPerPage = ref()
const user = ref()
const url = 'users'
const conf_inicial = {
    page: 1,
    per_page: 10,
    sort: [{ key: 'id', order: 'asc' }]
}
const index = ref()
const dialog = ref()
const dialog_delete = ref()
const item_editado = ref({
    nome_completo: '',
    email: '',
    cpf: '',
    telefone: '',
})

const item_padrao = ({
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
    index.value = user.value.id
    item_editado.value = Object.assign({}, item)
    dialog.value = true
}

function deleteItem(item: any) {
    index.value = user.value.id
    item_editado.value = Object.assign({}, item)
    dialog_delete.value = true
}

function deleteItemConfirm() {
    user.value.splice(index, 1)
    closeDelete()
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
        index.value = -1
    })
}

function save() {
    if (index.value > -1) {
        Object.assign(user.value[index.value], item_editado.value)
    } else {
        user.value.push(item_editado.value)
    }
    close()
}

const form_title: ComputedRef<string> = computed(() => {
    return index.value === 0 ? 'Novo item' : 'Editar item'
});

watch(dialog, async (val) => {
    val || close()
})

watch(dialog_delete, async (val) => {
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
                        <v-toolbar flat color="indigo">
                            <v-toolbar-title>Usuários</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ props }">
                                    <v-btn class="mb-2" v-bind="props">
                                        Novo item
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">{{ form_title }}</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <form-user 
                                            v-model:nome_completo="item_editado.nome_completo" 
                                            v-model:email="item_editado.email"
                                            v-model:cpf="item_editado.cpf"
                                            v-model:telefone="item_editado.telefone"
                                        />
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-darken-1" variant="text" @click="close">
                                            Cancelar
                                        </v-btn>
                                        <v-btn color="blue-darken-1" variant="text" @click="save" v-if="index == 0">
                                            Salvar
                                        </v-btn>
                                        <v-btn color="blue-darken-1" variant="text" @click="save" v-else>
                                            Atualizar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialog_delete" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5">Tem certeza que deseja remover?</v-card-title>
                                    <v-card-actions>
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
                        <v-btn color="primary" >
                            Reset
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-row>
    </v-container>
</template>