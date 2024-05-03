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
    <v-navigation-drawer v-model="is_showing" id="sidebar" temporary>
        <v-list density="compact" nav>
            <v-list-item v-for="route in showable_routes" :to="route.path" class="list-items">
                {{ route.pt_name }}
                <hr class="route-separator">
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
@import "@/assets/main.css";

#sidebar {
    background-color: var(--palette-gray);
}

.list-items {
    text-transform: capitalize;
    color: #fff;
}

.route-separator {
    color: var(--palette-orange);
}
</style>
