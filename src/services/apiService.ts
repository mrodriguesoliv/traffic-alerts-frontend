import apiClient from './apiClient';
interface TrafficAlert {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

export const fetchTrafficAlerts = async (): Promise<TrafficAlert[]> => {
  try {
    const response = await apiClient.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar alertas de tráfego:', error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<{ token: string } | null> => {
  try {
    const response = await apiClient.post('/auth', { email, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};