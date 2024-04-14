<script setup>
</script>

<template>
    <v-app-bar id="site-header">
        <v-row>
            <v-col>
                <v-app-bar-nav-icon icon="mdi-menu" @click="$emit('openSideBar')" />
            </v-col>
            <v-col id="site-title">
                <v-app-bar-title>fabricaNeeds</v-app-bar-title>
            </v-col>
            <v-col>
                <!-- Placeholder for user operations (login and logout) -->
                <v-app-bar-nav-icon icon="mdi-account" />
            </v-col>
        </v-row>

    </v-app-bar>
</template>

<style scoped>
#site-header {
    background-color: #575555;
    color: #fff;

    display: flex;
    text-align: center;
}

#site-title {
    align-self: center;
}

#logout-btn {
    background-color: #f57c0b;
}
</style>
