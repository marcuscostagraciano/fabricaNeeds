<script setup>
defineProps({
    items_list: Object,
    auxiliar_function: Function
})

</script>

<template>
    <v-table density="comfortable">
        <thead>
            <tr>
                <th>Código</th>
                <th>Item</th>
                <th>Está na lista?</th>
                <th>Excluir</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in items_list">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td v-if="item.active">Sim</td>
                <td v-else>Não</td>

                <td><v-icon @click="auxiliar_function(item.id)" class="delete-button">mdi-delete</v-icon></td>
            </tr>
        </tbody>
    </v-table>
</template>

<style scoped>
* {
    text-align: center
}

.delete-button {
    color: rgb(255, 0, 0);
}
</style>
