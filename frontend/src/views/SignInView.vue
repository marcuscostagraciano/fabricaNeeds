<script setup>
</script>

<template>
    <v-form class="form">
        <h1 class="text-center mb-5">Sign-in</h1>
        <v-text-field label="E-mail" v-model="email" type="email" />
        <v-text-field label="Senha" v-model="password" type="password" />

        <div class="form-actions">
            <router-link to="/signup">
                <v-btn>Cadastrar-se</v-btn>
            </router-link>
            <v-btn>Log-in</v-btn>
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
