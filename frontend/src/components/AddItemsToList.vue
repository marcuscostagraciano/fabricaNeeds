<script setup>
import { reactive, ref } from 'vue';

import { useItemStore } from '@/stores/itemStore';

const itemStore = useItemStore()

const itemsToBeActived = ref([])

const addToList = (item) => {
    itemsToBeActived.value.push(item)
}
const removeFromList = (selected_item) => {
    itemsToBeActived.value = itemsToBeActived.value.filter(item => item !== selected_item);
}
const isInList = (item) => (itemsToBeActived.value.includes(item))

const cancelAddition = (controlVar) => {
    controlVar.value = false
    itemsToBeActived.value = []
}
const toggleListedItems = async (controlVar) => {
    for (const item of itemsToBeActived.value) {
        await itemStore.toggleActive(item.id)
    }
    cancelAddition(controlVar)
}

</script>

<template>
    <v-dialog activator="btn" max-width="340" persistent>
        <template v-slot:default="{ isActive }">
            <v-card prepend-icon="mdi-invoice-list-outline" title="Adicionar itens a lista" class="card">
                <table>
                    <div v-if="itemStore.inactiveItems.length" class="items">
                        <tr v-for="item in itemStore.inactiveItems" :key="item.id" class="item">
                            <td>{{ item.name }}</td>
                            <td>
                                <v-icon v-if="!isInList(item)" @click="addToList(item)">mdi-cart-plus</v-icon>
                                <v-icon v-else @click="removeFromList(item)">mdi-cart-remove</v-icon>
                            </td>
                        </tr>
                    </div>
                    <div v-else class="text-center">Sem itens à serem adicionados</div>
                </table>

                <template v-slot:actions>
                    <v-btn class="ma-auto" @click="cancelAddition(isActive)">Cancelar</v-btn>
                    <v-btn class="ma-auto" :disabled="itemsToBeActived.length == 0"
                        @click="toggleListedItems(isActive)">Adicionar</v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped>
@import '@/assets/css/addcards.css';

.item {
    display: grid;
    /* am i the only one who reads "for real" ? */
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
        "item-name action-button";
    text-align: center;
}

.items {
    display: flex;
    flex-direction: column;
}

.item {
    display: grid;
    /* am i the only one who reads "for real" ? */
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
        "item-name action-button";
    text-align: center;
}

td:nth-child(1) {
    grid-area: "item-name";
}

td:nth-child(2) {
    grid-area: "action-button";
}
</style>
