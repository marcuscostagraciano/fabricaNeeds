<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';

import Header from "./components/Header.vue";
import SideBar from './components/SideBar.vue';

const showSideBar = ref(false)
const toggleDrawer = () => { showSideBar.value = !showSideBar.value }

</script>

<template>
  <v-app>
    <!-- When the "@openSideBar" triggers, execute "toggleDrawer()" -->
    <Header @openSideBar="toggleDrawer" />

    <v-main>
      <SideBar v-model="showSideBar" @toggle-drawer="toggleDrawer" />
      <RouterView />
    </v-main>

  </v-app>
</template>

<style scoped></style>
