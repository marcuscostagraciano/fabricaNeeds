<script setup>
import { computed, reactive, ref } from 'vue';
import { useHistoryStore } from '@/stores/historyStore';
import { useBalanceStore } from '@/stores/balanceStore';

const historyStore = useHistoryStore()

const balanceStore = useBalanceStore()
balanceStore.getBalance()
const form_balance = ref()
const form_data_balance = reactive({
    id: 0,
    value: 0,
})

</script>

<template>
    <div class="home">
        <table class="infoList">
            <thead class="historyHead">
                <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody v-for="info in historyStore.formattedHistory" class="historyBody">
                <tr>
                    <td class="infoDate">
                        <p>{{ info.datetime.day }}/{{ info.datetime.month }}</p>
                        <p>{{ info.datetime.hour }}:{{ info.datetime.minutes }}</p>
                    </td>
                    <td class="infoDesc">{{ info.justification }}</td>
                    <td :class="info.value > 0 ? 'text-green text-center' : 'text-red text-center'">R$ {{
                Math.abs(info.value).toFixed(2) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
.home {
    margin-top: 5%;
    display: flex;
    justify-content: center;
}

.infoList {
    min-width: 80%;
    border: 1px solid grey;
    border-radius: 20px;
    flex-direction: column;
    padding: 0.5% 0%;
}

.historyHead {
    align-items: center;
    text-align: center;
}

.historyHead th {
    padding: 0% 1%;
    border-bottom: 1px solid grey;
}

.historyBody {
    justify-content: space-between;
    align-items: center;
}

.infoValue {
    text-align: center;
}

.infoDate {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: small;
    font-weight: 700;
}
</style>
