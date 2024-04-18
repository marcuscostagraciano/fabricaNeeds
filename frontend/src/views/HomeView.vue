<script setup>
import { computed, reactive, ref } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { useBalanceStore } from '@/stores/balanceStore';
import ItemsDetails from '@/components/ItemsDetails.vue';

const itemStore = useItemStore()
itemStore.getItems()

const balanceStore = useBalanceStore()
balanceStore.getBalance()
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
        <div class="container">
            <div class="balance">
                <h1 class="">Saldo</h1>
                <div class="balanceValue">
                    <h1 v-if="balanceStore.loading">Carregando itens</h1>
                    <h3 v-else class="">R$ {{ balanceStore.registeredBalance[0].value.toFixed(2) }}</h3>
                    <v-btn class="d-flex align-self-end h-auto w-auto pa-3" icon="mdi-plus" size="x-large"></v-btn>
                </div>
            </div>
            <hr>
            <div class="itemsList">
                <ItemsDetails item_selection="active" class="item"/>            
            </div>
        </div>
    </div>
</template>

<style scoped>
.home {
    margin-top: 5%;
    display: flex;
    justify-content: center;
}

.container{
    min-width: 70%;
    flex-direction: column;
    align-items: center;
}

.balance{
    display:flex;
    margin-left: 8%;
    margin-bottom: 2%;
    justify-content: space-between;
}

.balance h1{
    align-self: center;
}

.balanceValue{
    width: 25%;
    display: flex;
    align-items: center;
}

.balanceValue h3{
    margin-right: 8%;
}

.balance .v-btn{
    background-color: rgb(211, 211, 211);
    align-self: center;
}

.itemsList{
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    align-items:center;
}

.item td{
    border: 1px solid black;
}

.inactive{
    opacity: 50%;
}

</style>
