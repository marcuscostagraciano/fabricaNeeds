<script setup>
import { computed, reactive, ref } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { useBalanceStore } from '@/stores/balanceStore';

const itemStore = useItemStore()


const balanceStore = useBalanceStore()
const form_balance = ref()
const form_data_balance = reactive({
    id: 0,
    value: 0,
})

const isFormValid = computed(() => {
    return requiredRule(form_data.item_name) == true;
});
</script>

<template>
    <div class="home">
        <div class="d-flex">
            <h1 class="text-start mb-5 me-auto">Saldo</h1>
            <div class="">
                <h2 class="" >R$ {{ balanceStore.getBalance }}</h2>
                <v-btn class="h-auto w-auto pa-3" icon="mdi-plus" size="x-large"></v-btn>
            </div>
        </div>
        <hr>
        <div class="itemsList">
            <v-table>
                <tbody>
                    <tr v-for="item in itemStore.registeredItems">
                        <td>{{ item.name }}</td>
                        <!-- <td v-if="item.active">Sim</td>
                        <td v-else>Não</td> -->

                        <td><v-icon @click="deleteItem(item.name)" class="delete-button">mdi-delete</v-icon></td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>
</template>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    margin: 20vh 30vw;
}

.v-btn {
    background-color: rgb(211, 211, 211);
}</style>
