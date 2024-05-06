<script setup>
import { reactive, ref } from 'vue';

import { useItemStore } from '@/stores/itemStore';
import { useBuyItemsStore } from '@/stores/buyItemsStore';

const itemStore = useItemStore()
const buyItemsStore = useBuyItemsStore()

defineProps({
    items: Object,
})

// List containing { items; price }
const prices = ref([])

const cancelAddition = (controlVar) => {
    controlVar.value = false
    prices.value = []
}
const buyItems = async (controlVar) => {
    buyItemsStore.buyItems(prices.value)
    // cancelAddition(controlVar)
}


</script>

<template>
    <v-dialog activator="btn" max-width="340" persistent>
        <template v-slot:default="{ isActive }">
            <v-card class="card">
                <v-card v-for="item in items" :key="item.id" class="items">
                    {{ item.name }}
                    <v-text-field name="Preço" label="Preço" id="id" v-model="prices[item.id]"
                        type="number">R$</v-text-field>
                </v-card>

                <template v-slot:actions>
                    <v-btn class="ma-auto" @click="cancelAddition(isActive)">Cancelar</v-btn>
                    <v-btn class="ma-auto" @click="buyItems(isActive)">Baixa</v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped>
@import '@/assets/css/addcards.css';

.item {
    text-align: center;
}
</style>
