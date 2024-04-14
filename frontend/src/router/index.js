import { createRouter, createWebHistory } from 'vue-router';

import routesJSON from '@/data/routes.json'

export const routes = routesJSON.map(route => ({
  ...route,
  component: () => import(`@/views/${route.component}.vue`)
}));

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
