<script setup>
import { RouterView } from 'vue-router'

import Header from "./components/Header.vue"
</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <RouterView />
    </v-main>

  </v-app>
</template>

<style scoped></style>
