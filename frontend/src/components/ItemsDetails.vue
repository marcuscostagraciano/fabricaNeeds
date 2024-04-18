<script setup>
import { useItemStore } from '@/stores/itemStore';

defineProps({
    item_selection: String,
})

const itemStore = useItemStore()
itemStore.getItems()
</script>

<template>
    <tbody v-if="item_selection == 'registered'">
        <tr v-for="item in itemStore.registeredItems">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td v-if="item.active">Sim</td>
            <td v-else>Não</td>
            <td><v-btn @click="itemStore.toggleActive(item.id)"> Alterar status </v-btn></td>
        </tr>
    </tbody>
    <tbody v-else-if="item_selection == 'active'">
        <tr v-for=" item in itemStore.activeItems">
            <td>{{ item.name }}</td>
        </tr>
    </tbody>
    <tbody v-else-if="item_selection == 'inactive'">
        <tr v-for="item in itemStore.inactiveItems">
            <td>{{ item.name }}</td>
        </tr>
    </tbody>
</template>

<style scoped>
* {
    text-align: center;
    border: 1px solid rgb(119, 119, 119, 0.5);
    /* border-radius: 10%; */
}

.toggleButton {
    cursor: pointer;
}
</style>
