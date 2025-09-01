import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/pages/auth/LoginPage.vue'
import HomePage from '@/pages/home/HomePage.vue'
import NotificationPage from '@/pages/home/views/NotificationPage.vue'
import NavigationPage from '@/pages/home/views/NavigationPage.vue'

const routes = [
  { path: '/auth', name: 'Auth', component: AuthPage },
  { path: '/', 
    component: HomePage, 
    children: [
      { path: 'notification', name: 'Notification', component: NotificationPage },
      { path: 'navigation', name: 'Navigation', component: NavigationPage },
    ] 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
