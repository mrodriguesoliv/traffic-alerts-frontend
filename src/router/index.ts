import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/pages/auth/LoginPage.vue'
import LandingPage from '@/pages/home/LandingPage.vue'
import DashboardPage from '@/pages/home/views/DashboardPage.vue'

const routes = [
  { path: '/auth', name: 'Auth', component: AuthPage },
  { path: '/', 
    component: LandingPage, 
    children: [
      { path: 'dashboard', name: 'Dashboard', component: DashboardPage },
    ] 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
