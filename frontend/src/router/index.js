import { createRouter, createWebHistory } from 'vue-router';

import routesJSON from '@/data/routes.json'

import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import RegisterItemView from '@/views/RegisterItemView.vue'

export const routes = routesJSON.map(route => ({
  ...route,
  component: () => import(`@/views/${route.component}.vue`)
}));

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
