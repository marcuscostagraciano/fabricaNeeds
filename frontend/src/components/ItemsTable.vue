<script setup>
import { useItemStore } from '@/stores/itemStore';
import ItemsDetails from '@/components/ItemsDetails.vue'

defineProps({
    item_selection: String,
})

const itemStore = useItemStore()

</script>

<template>
    <h1 class="text-center mt-2 mb-5">Itens já registrados</h1>
    <h1 v-if="itemStore.loading">Carregando itens</h1>
    <v-table v-else density="compact" class="rounded-lg">
        <thead>
            <tr>
                <th class="text-center">ID</th>
                <th class="text-center">Item</th>
                <th class="text-center">Está na lista?</th>
            </tr>
        </thead>
        <ItemsDetails :item_selection="item_selection" />
    </v-table>
</template>

<style scoped>
* {
    text-align: center;
    border: 1px solid rgb(119, 119, 119, 0.5);
    /* border-radius: 10%; */
}
</style>
