<script setup>
defineProps({
    item: Object,
})

</script>

<template>
    <tr>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td v-if="item.active">Sim</td>
        <td v-else>Não</td>

        <td><v-icon @click="console.log(item.id)" class="delete-button">mdi-delete</v-icon></td>
    </tr>
</template>

<style scoped>
* {
    text-align: center
}

.delete-button {
    color: rgb(255, 0, 0);
}
</style>
