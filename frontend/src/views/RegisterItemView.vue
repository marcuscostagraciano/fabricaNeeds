<script setup>
import { computed, onMounted, reactive, ref } from 'vue';

import { requiredRule } from '@/utils/formValidationRules';
import { useItemStore } from '@/stores/itemStore';
import ItemsTable from '@/components/ItemsTable.vue'

const itemStore = useItemStore()

const form = ref()
const form_data = reactive({
    name: '',
    active: false,
})

const isFormValid = computed(() => {
    return requiredRule(form_data.name) == true;
});

const createItem = async () => {
    await itemStore.createItem(form_data)
    form.value.reset()
}
// const deleteItem = async (id) => {
//     await itemStore.deleteItem(id)
//     form.value.reset()
// }

</script>

<template>
    <v-form class="mb-5 form" @submit.prevent="createItem" ref="form">
        <h1 class="text-center mb-5">Cadastro de itens</h1>
        <v-text-field label="Nome do item" :rules="[requiredRule]" v-model="form_data.name" />
        <v-checkbox label="Adicionar item à lista?" v-model="form_data.active" />

        <div class="form-actions">
            <v-btn :disabled="!isFormValid" type="submit">Registrar item</v-btn>
        </div>
    </v-form>
    <hr>
    <ItemsTable item_selection="registered" />
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
