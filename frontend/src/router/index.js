import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import SignInView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';

export const routes = [
  { path: '/', name: 'home', pt_name: 'página inicial', component: HomeView, show: true },
  { path: '/history', name: 'history', pt_name: 'histórico', component: HomeView, show: true },
  { path: '/signin', name: 'sign-in', pt_name: 'login', component: SignInView, show: false },
  { path: '/signup', name: 'sign-up', pt_name: 'cadastro', component: SignUpView, show: false },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
