<script setup>
import { computed, reactive, ref } from 'vue';

import {
    requiredRule, emailRule,
    passwordLengthRule, passwordConfirmationRule
} from '@/utils/formValidationRules';

import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()

const showing_password = ref(false)
const successful_signup = ref(false)

const form = ref()
const form_data = reactive({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const isFormValid = computed(() => {
    return [
        requiredRule(form_data.username),
        emailRule[1](form_data.email),
        passwordLengthRule[1](form_data.password),
        passwordConfirmationRule[1](form_data.password_confirmation, form_data.password)
    ].every(rule => rule === true);
})

async function createUser() {
    const resp = await userStore.createUser(form_data)
    successful_signup.value = resp

    // Reset form fields
    form.value.reset();

    // Clear input values
    form_data.username = '';
    form_data.email = '';
    form_data.password = '';
    form_data.password_confirmation = '';
}
</script>

<template>
    <v-form class="form" @submit.prevent ref="form">
        <h1 class="text-center mb-5">Cadastro</h1>
        <v-text-field label="Nome de Usuário" :rules="[requiredRule]" v-model="form_data.username" type="text"
            messages="Este nome é vísivel para outros usuários." hint="Use o formato de NomeSobrenome." />
        <v-text-field label="E-mail" :rules="emailRule" v-model="form_data.email" type="email" />
        <v-text-field label="Senha" :rules="passwordLengthRule" v-model="form_data.password"
            :type="showing_password ? 'text' : 'password'"
            :append-inner-icon="showing_password ? 'mdi-eye-closed' : 'mdi-eye'"
            @click:append-inner="showing_password = !showing_password" />
        <v-text-field label="Confirmação de senha"
            :rules="[passwordConfirmationRule[1](form_data.password_confirmation, form_data.password)]"
            v-model="form_data.password_confirmation" type="password" />

        <div class="form-actions">
            <v-btn :disabled="!isFormValid" @click="createUser()">Cadastrar-se</v-btn>

            <router-link v-if="successful_signup" to="/signin">
                <v-btn>Log-in</v-btn>
            </router-link>
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
