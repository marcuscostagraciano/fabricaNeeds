<script setup>
import { ref } from 'vue';

import { useItemStore } from '@/stores/itemStore';
import { useBuyItemsStore } from '@/stores/buyItemsStore';

const itemStore = useItemStore()
const buyItemsStore = useBuyItemsStore()

const emit = defineEmits(['submit'])
defineProps({
    items: Object,
})

// List containing { items; price }
const prices = ref([])

const closeDialog = (controlVar) => {
    controlVar.value = false
    prices.value = []
}

const buyItems = async (controlVar) => {
    await buyItemsStore.buyItems(prices.value)
    closeDialog(controlVar)
    emit('submit')
}

</script>

<template>
    <v-dialog activator="btn" max-width="340" persistent>
        <template v-slot:default="{ isActive }">
            <v-card class="card">
                <!-- PRECISA FICAR BONITO :) -->
                <v-card v-for="item in items" :key="item.id" class="items">
                    <div class="item">
                        {{ item.name }}
                        <v-text-field name="Preço" label="Preço (R$)" :id="item.id" v-model="prices[item.id]"
                            type="number" />
                    </div>
                </v-card>

                <template v-slot:actions>
                    <v-btn class="ma-auto" @click="closeDialog(isActive)">Cancelar</v-btn>
                    <v-btn class="ma-auto" @click="buyItems(isActive)">Baixa</v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped>
@import '@/assets/css/addcards.css';

.items {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
}

.item {
    padding: 5%;
}
</style>
