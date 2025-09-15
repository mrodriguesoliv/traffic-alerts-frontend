import axios from 'axios';

interface TrafficAlert {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTrafficAlerts = async (): Promise<TrafficAlert[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao buscar alertas de tráfego:', error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
    return [];
  }
};


export const login = async (email: string, password: string): Promise<{ token: string } | null> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao fazer login:', error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
    return null;
  }
};