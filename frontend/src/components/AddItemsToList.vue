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
}

</script>

<template>
    <v-dialog activator="btn" max-width="340" persistent>
        <template v-slot:default="{ isActive }">
            <v-card prepend-icon="mdi-cart-plus" title="Adicionar itens a lista">
                <v-list>
                    <v-list-item v-for="item in itemStore.inactiveItems" :key="item.id">
                        {{ item.name }}
                        <v-icon v-if="!isInList(item)" @click="addToList(item)">mdi-cart-plus</v-icon>
                        <v-icon v-else @click="removeFromList(item)">mdi-cart-remove</v-icon>
                    </v-list-item>
                </v-list>

                <template v-slot:actions>
                    <v-btn class="ma-auto" @click="cancelAddition(isActive)">Cancelar</v-btn>
                    <v-btn class="ma-auto" :disabled="itemsToBeActived.length == 0"
                        @click="isActive.value = false">Adicionar</v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>

</template>

<style scoped></style>
