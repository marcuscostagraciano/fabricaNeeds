<script setup>
import { defineComponent } from 'vue';

import { routes } from '@/router';

defineComponent({
    props: {
        is_showing: Boolean
    }
})

</script>

<template>
    <v-navigation-drawer v-model="is_showing" temporary>
        <v-list density="compact" nav>
            <v-list-item v-for="route in routes" :title="route.name" :to="route.path"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped></style>
