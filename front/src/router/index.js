import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
// import LoginForm from '@/views/LoginForm.vue';

export const routes = [
  { path: '/', name: 'home', component: HomeView },
  // { path: '/login', name: 'login', component: LoginForm },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
