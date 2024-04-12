<script setup>
import { routes } from '@/router';

</script>

<template>
    <router-link v-for="route in routes" :to="route.path">{{ route.name }}</router-link>
</template>

<style scoped></style>
