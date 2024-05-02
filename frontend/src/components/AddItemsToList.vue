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
            <v-card prepend-icon="mdi-cart-plus" title="Adicionar itens a lista">
                <table>
                    <tr v-for="item in itemStore.inactiveItems" :key="item.id" class="item">
                        <td>{{ item.name }}</td>
                        <td>
                            <v-icon v-if="!isInList(item)" @click="addToList(item)">mdi-cart-plus</v-icon>
                            <v-icon v-else @click="removeFromList(item)">mdi-cart-remove</v-icon>
                        </td>
                    </tr>
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
.item {
    text-align: center;
}
</style>
