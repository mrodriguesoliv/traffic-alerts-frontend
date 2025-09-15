import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userEmail = ref(localStorage.getItem('userEmail') || '');
const router = useRouter();

export function useAuth() {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    userEmail.value = '';
    router.push('/auth');
  };

  return { userEmail, logout };
}
