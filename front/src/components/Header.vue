<script setup>
import { routes } from '../router'

</script>

<template>
    <v-app-bar density="comfortable">
        <v-col>
            <v-app-bar-title class="font-weight-bold">
                FabricaNeeds
            </v-app-bar-title>
        </v-col>

        <v-col>
            <v-btn v-for="route in routes" class="px-2 py-0">
                <router-link :to="route.path">{{ route.name }}</router-link>
            </v-btn>
        </v-col>
    </v-app-bar>
</template>

<style scoped>
.v-col {
    text-align: center
}

a {
    text-decoration: none;
}
</style>
