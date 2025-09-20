import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {

  const userEmail = ref(localStorage.getItem('userEmail') || '');
  const token = ref(localStorage.getItem('token') || '');

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
  };

  const isLoggedIn = () => !!token.value;

  return { userEmail, token, setUser, logout, isLoggedIn };
});
