<script setup>
import { reactive, ref } from 'vue';

import { useItemStore } from '@/stores/itemStore';

const itemStore = useItemStore()

const itemsToBeActived = ref([])

const addToList = (item) => {
    console.log("item: ", item)
    itemsToBeActived.value.push(item)
    console.log("itemsToBeActived: ", itemsToBeActived.value)
}

</script>

<template>
    <v-dialog activator="btn" max-width="340" persistent>
        <template v-slot:default="{ isActive }">
            <v-card prepend-icon="mdi-cart-plus" title="Adicionar itens a lista">
                <v-list>
                    <v-list-item v-for="item in itemStore.inactiveItems" :key="item.id">
                        {{ item.name }}
                        <v-icon @click="addToList(item)">mdi-cart-plus</v-icon>
                        <v-icon @click="removeFromList(item)">mdi-cart-remove</v-icon>
                    </v-list-item>
                </v-list>

                <template v-slot:actions>
                    <v-btn class="ma-auto" text="Cancelar" @click="isActive.value = false"></v-btn>
                    <v-btn class="ma-auto" text="Adicionar" @click="isActive.value = false"></v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>

</template>

<style scoped></style>
