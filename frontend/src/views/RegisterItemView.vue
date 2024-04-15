<script setup>
import { computed, onMounted, reactive, ref } from 'vue';

import { requiredRule } from '@/utils/formValidationRules';
import { useItemStore } from '@/stores/itemStore';

import ItemsDetailRow from '@/components/RegisteredItemsList/ItemsDetailRow.vue'
import ItemsTableHeader from '@/components/RegisteredItemsList/ItemsTableHeader.vue'

const itemStore = useItemStore()

const form = ref()
const form_data = reactive({
    item_name: '',
    is_active: false,
})
const registered_items = ref()

onMounted(async () => {
    // registered_items.value = await itemStore.getItems()
})


const isFormValid = computed(() => {
    return requiredRule(form_data.item_name) == true;
});

async function createItem() {
    console.log(form_data);
    form.value.reset()
}

</script>

<template>
    <v-form class="form" @submit.prevent="createItem" ref="form">
        <h1 class="text-center mb-5">Cadastro de itens</h1>
        <v-text-field label="Nome do item" :rules="[requiredRule]" v-model="form_data.item_name" />
        <v-checkbox label="Adicionar item à lista?" v-model="form_data.is_active" />

        <div class="form-actions">
            <v-btn :disabled="!isFormValid" type="submit">Registrar item</v-btn>
        </div>
    </v-form>
    <h1 class="text-center mt-5">Itens já registrados</h1>
    <v-table>
        <ItemsTableHeader />
        <tbody>
            <ItemsDetailRow v-for="item in itemStore.item" :item="item" />
        </tbody>
    </v-table>
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
