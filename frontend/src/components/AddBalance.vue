<script setup>
import { computed, reactive, ref } from 'vue';

import { positiveBalanceRule } from '@/utils/formValidationRules'

import { useBalanceStore } from '@/stores/balanceStore';

const balanceStore = new useBalanceStore()

const valueToBeAdded = ref(null)

const exitDialog = (controlVar) => {
    controlVar.value = false
    valueToBeAdded.value = null
}
const addValue = async (controlVar) => {
    await balanceStore.updateBalance(valueToBeAdded.value)
    exitDialog(controlVar)
}

const validInput = computed(
    () => (positiveBalanceRule[0](valueToBeAdded.value) === true)
)

</script>

<template>
    <v-dialog activator="btn" max-width="340" persistent>
        <template v-slot:default="{ isActive }">
            <v-card prepend-icon="mdi-pig" title="Adicionar doação">
                <v-text-field label="Valor" :rules="positiveBalanceRule" v-model="valueToBeAdded" type="number"
                    class="px-3 pt-3" />


                <template v-slot:actions>
                    <v-btn class="ma-auto" @click="exitDialog(isActive)">Cancelar</v-btn>
                    <v-btn class="ma-auto" :disabled="!validInput" @click="addValue(isActive)">Adicionar</v-btn>
                </template>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped></style>
