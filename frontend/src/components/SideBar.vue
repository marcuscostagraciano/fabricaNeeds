<script setup>
import { defineComponent } from 'vue';

import { routes } from '@/router';
const showable_routes = routes.filter(route => route.show)

defineComponent({
    props: {
        is_showing: Boolean
    }
})

</script>

<template>
    <v-navigation-drawer v-model="is_showing" temporary>
        <v-list density="compact" nav>
            <v-list-item v-for="route in showable_routes" :to="route.path" class="list-items">
                {{ route.name }}
                <hr>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
.list-items {
    text-transform: capitalize;

}
</style>
