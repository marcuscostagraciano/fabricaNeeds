<script setup>
import { computed, reactive, ref } from 'vue';
import { useItemStore } from '@/stores/itemStore';

const itemStore = useItemStore()
const form = ref()
const form_data = reactive({
    item_name: '',
    is_active: false,
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
                
                <v-btn class=""></v-btn>
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
