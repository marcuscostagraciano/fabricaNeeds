<script setup>
import { ref } from 'vue';

const username = ref('')
username.value = (new RegExp('(?:^|; )username=([^;]*)').exec(document.cookie)) ? (new RegExp('(?:^|; )username=([^;]*)').exec(document.cookie)[1]) : null;


</script>

<template>
    <v-app-bar id="site-header">
        <v-row>
            <v-col>
                <v-app-bar-nav-icon v-if="username" icon="mdi-menu" @click="$emit('openSideBar')" />
            </v-col>
            <v-col id="site-title">
                <v-app-bar-title>
                    <router-link v-if="username" to="/">fabricaNeeds</router-link>
                    <p v-else>fabricaNeeds</p>
                </v-app-bar-title>
            </v-col>
            <v-col>
                <!-- Placeholder for user operations (login and logout) -->
                <!-- <v-app-bar-nav-icon icon="mdi-account" /> -->
                <div v-if="username">
                    {{ username }}
                </div>
            </v-col>
        </v-row>

    </v-app-bar>
</template>

<style scoped>
#site-header {
    background-color: var(--palette-gray);
    color: #fff;

    display: flex;
    text-align: center;
}

#site-title {
    align-self: center;
}

#site-title a {
    color: #fff;
    text-decoration: none;
    cursor: url('@/assets/icons/home-white.svg'), pointer;
}

.auth-options {
    display: flex;
    text-transform: capitalize;

    align-content: center;
    justify-content: center;
    flex-direction: column;
}

#logout-btn {
    background-color: var(--palette-orange);
}
</style>
