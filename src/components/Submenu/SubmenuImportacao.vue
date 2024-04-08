<script setup lang="ts">
import { ref } from 'vue';

const tab = ref()
</script>
<template>
    <v-card>
      <v-tabs
        v-model="tab"
        align-tabs="center"
        color="deep-purple-accent-4"
      >
        <v-tab :value="1">Novo</v-tab>
        <v-tab :value="2">Importar</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-if="tab === 1">
      
        </v-window-item>
        <v-window-item v-if="tab === 2">
          <info-importacao tipo_importacao="Custódia"></info-importacao>
<form enctype="multipart/form-data">
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
              </form>
      
        </v-window-item>
      </v-window>
    </v-card>
  </template>