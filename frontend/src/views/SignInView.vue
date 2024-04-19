<script setup>
import { computed, reactive, ref } from 'vue';

import { passwordLengthRule } from '@/utils/formValidationRules';

import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()

const form = ref()
const form_data = reactive({
    user: 'teste',
    password: 'senha.123',
})

const isFormValid = computed(() => {
    return [
        passwordLengthRule[1](form_data.password),
    ].every(rule => rule === true);
});

const signIn = async () => {
    await authStore.signIn(form_data)
}
</script>

<template>
    <v-form class="form" @submit.prevent="signIn" ref="form">
        <h1 class="text-center mb-5">Login</h1>
        <v-text-field label="Usuário" v-model="form_data.user" type="text" />
        <v-text-field label="Senha" :rules="passwordLengthRule" v-model="form_data.password" type="password" />

        <div class="form-actions">
            <router-link to="/signup">
                <v-btn>Cadastrar-se</v-btn>
            </router-link>
            <v-btn :disabled="!isFormValid" type="submit">Log-in</v-btn>
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
