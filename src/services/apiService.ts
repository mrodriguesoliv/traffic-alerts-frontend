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
    const response = await axios.get(`${API_BASE_URL}/alerts`);
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