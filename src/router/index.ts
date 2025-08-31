import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/pages/Auth/index.vue'

const routes = [
  { path: '/auth', name: 'Auth', component: AuthPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
