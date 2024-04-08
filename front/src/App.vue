<script setup>
import Header from './components/Header.vue';

</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
html {
  height: 100vh;
  width: 100vw;
}
</style>
