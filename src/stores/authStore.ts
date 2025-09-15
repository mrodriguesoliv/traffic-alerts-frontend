// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  // Estado do usuário
  const userEmail = ref(localStorage.getItem('userEmail') || '');
  const token = ref(localStorage.getItem('token') || '');

  // Ações
  const setUser = (email: string, userToken: string) => {
    userEmail.value = email;
    token.value = userToken;
    localStorage.setItem('userEmail', email);
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    userEmail.value = '';
    token.value = '';
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    router.push('/auth');
  };

  const isLoggedIn = () => !!token.value;

  return { userEmail, token, setUser, logout, isLoggedIn };
});
