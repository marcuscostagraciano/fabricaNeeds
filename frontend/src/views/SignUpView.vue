<script setup>
import { ref } from 'vue';

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

</script>

<template>
    <v-form class="form" @submit.prevent>
        <h1 class="text-center mb-5">Sign-up</h1>
        <v-text-field label="Nome" v-model="name" type="text" />
        <v-text-field label="E-mail" v-model="email" type="email" />
        <v-text-field label="Senha" v-model="password" type="password" />
        <v-text-field label="Confirmação de senha" v-model="password_confirmation" type="password" />

        <div class="form-actions">
            <v-btn>Cadastrar-se</v-btn>
        </div>
    </v-form>
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    margin: 20vh 30vw;
}

.form-actions {
    display: flex;
    justify-content: space-around;
}

.v-btn {
    background-color: rgb(211, 211, 211);
}
</style>
