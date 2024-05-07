<script setup>
import { computed, reactive, ref } from 'vue';

import { useItemStore } from '@/stores/itemStore';
import { useBalanceStore } from '@/stores/balanceStore';

import ItemsDetails from '@/components/ItemsDetails.vue';
import AddItemsToList from '@/components/AddItemsToList.vue';
import BuyItemsFromList from '@/components/BuyItemsFromList.vue';
import AddBalance from '@/components/AddBalance.vue'

const itemStore = useItemStore()
itemStore.getItems()

const balanceStore = useBalanceStore()
balanceStore.getBalance()

const form_balance = ref()
const form_data_balance = reactive({
    id: 0,
    value: 0,
})

const addBalanceBtn = ref(null)
const addItemsToListBtn = ref(null)
const buyItemsBtn = ref(null)

const selected_items = ref([])

const addToList = (item) => {
    selected_items.value.push(item)
}
const removeFromList = (selected_item) => {
    selected_items.value = selected_items.value.filter(item => item !== selected_item);
}
const isInList = (item) => (selected_items.value.includes(item))

</script>

<template>
    <div class="home">
        <div class="container">
            <div class="balance">
                <h1 class="">Saldo</h1>
                <div class="balanceValue">
                    <h1 v-if="balanceStore.loading">Carregando itens</h1>
                    <h3 v-else class="">R$ {{ balanceStore.fixedBalance }}</h3>
                    <v-btn class="d-flex align-self-end h-auto w-auto pa-3" icon="mdi-plus" size="x-large"
                        ref="addBalanceBtn"></v-btn>
                    <v-btn class="d-flex align-self-end h-auto w-auto pa-3" icon="mdi-cart" size="x-large"
                        ref="addItemsToListBtn"></v-btn>
                </div>
            </div>
            <hr>
            <div class="itemsList">
                <table>
                    <tr v-for="item in itemStore.activeItemsByRecentUpdate" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ new Date(item.last_update).getDate() }}/{{ new Date(item.last_update).getMonth() + 1 }}
                        </td>
                        <td>
                            <v-icon class="itemBtn" v-if="!isInList(item)" @click="addToList(item)">mdi-plus</v-icon>
                            <v-icon class="itemBtn" v-else @click="removeFromList(item)">mdi-minus</v-icon>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-if="selected_items.length" class="mt-6 text-right">
                <h3>Itens selecionados:</h3>
                <v-chip v-for="item in selected_items">{{ item.name }}</v-chip>
                <br>
                <v-btn ref="buyItemsBtn">Dar baixa</v-btn>
            </div>
        </div>
        <AddBalance :activator="addBalanceBtn" />
        <AddItemsToList :activator="addItemsToListBtn" />
        <BuyItemsFromList :activator="buyItemsBtn" :items="selected_items" />
    </div>
</template>

<style scoped>
@import '@/assets/css/addcards.css';

.itemBtn {
    background-color: var(--palette-light-gray);
    cursor: pointer;
    border-radius: 50%;
}

td {
    padding: 0px 20px;
}

.home {
    margin-top: 5%;
    display: flex;
    justify-content: center;
}

.container {
    min-width: 70%;
    flex-direction: column;
    align-items: center;
}

.balance {
    display: flex;
    margin-left: 8%;
    margin-bottom: 2%;
    justify-content: space-between;
}

.balance h1 {
    align-self: center;
}

.balanceValue {
    width: 25%;
    display: flex;
    align-items: center;
}

.balanceValue h3 {
    margin-right: 8%;
}

.balance .v-btn {
    background-color: rgb(211, 211, 211);
    align-self: center;
}

.itemsList {
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.item td {
    border: 1px solid black;
}

.inactive {
    opacity: 50%;
}
</style>
