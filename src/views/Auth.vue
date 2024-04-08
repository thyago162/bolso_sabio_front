<script setup lang="ts">
import FormLogin from '@/components/Forms/FormLogin.vue';
import FormCadastro from '@/components/Forms/FormCadastro.vue';
import { ref } from 'vue';

//VARIÁVEIS
const tipo_acao = ref('login')

//FUNÇÕES
function alterarAcao(acao: any) {
    tipo_acao.value = acao
}
</script>

<template>
    <v-container fluid class="auth">
        <v-row :class="tipo_acao == 'login' ? 'login' : 'cadastro'">
            <v-col class="body">
                <v-card class="card-auth" width="700">
                    <div v-if="tipo_acao == 'login'">
                        <FormLogin @chamar-cadastro="alterarAcao"></FormLogin>
                    </div>
                    <div v-else>
                        <FormCadastro @chamar-login="alterarAcao"></FormCadastro>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
.auth {
    background: rgb(252, 252, 252);
    background: radial-gradient(circle, rgba(252, 252, 252, 1) 0%, rgba(89, 126, 168, 1) 100%);
    height: 100%;

    .logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 5%;
    }

    .body {
        display: flex;
        flex-direction: row;
        justify-content: center;
    
        .card-auth {
            border-radius: 10px;
        }
    }

    .login {
        margin-top: 10%;
    }

    .cadastro {
        margin-top: 1%;
    }
}
</style>
