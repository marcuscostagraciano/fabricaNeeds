<script setup>
import { computed, ref } from 'vue';

import {
    requiredRule, emailRule,
    passwordLengthRule, passwordConfirmationRule
} from '@/utils/formValidationRules';

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const isFormValid = computed(() => {
    return [
        requiredRule(name.value),
        emailRule[1](email.value),
        passwordLengthRule[1](password.value),
        passwordConfirmationRule[1](password_confirmation, password)
    ].every(rule => rule === true);
});

</script>

<template>
    <v-form class="form" @submit.prevent>
        <h1 class="text-center mb-5">Sign-up</h1>
        <v-text-field label="Nome" :rules="[requiredRule]" v-model="name" type="text" />
        <v-text-field label="E-mail" :rules="emailRule" v-model="email" type="email" />
        <v-text-field label="Senha" :rules="passwordLengthRule" v-model="password" type="password" />
        <v-text-field label="Confirmação de senha"
            :rules="[passwordConfirmationRule[1](password_confirmation, password)]" v-model="password_confirmation"
            type="password" />

        <div class="form-actions">
            <v-btn :disabled="!isFormValid">Cadastrar-se</v-btn>
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
