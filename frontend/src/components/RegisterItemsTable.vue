<script setup>
import { useItemStore } from '@/stores/itemStore';

const itemStore = useItemStore()
itemStore.getItems()

</script>

<template>
    <h1 class="text-center mt-2 mb-5">Itens já registrados</h1>
    <h1 v-if="itemStore.loading">Carregando itens</h1>
    <v-table v-else density="compact" class="rounded-lg">
        <thead>
            <tr>
                <th class="text-center">Item</th>
                <th class="text-center">Está na lista?</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in itemStore.registeredItems">
                <td>{{ item.name }}</td>
                <td v-if="item.active">Sim</td>
                <td v-else>Não</td>
            </tr>
        </tbody>
    </v-table>
</template>

<style scoped>
* {
    text-align: center;
    border: 1px solid rgb(119, 119, 119, 0.5);
    /* border-radius: 10%; */
}
</style>