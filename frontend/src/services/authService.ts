import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const sendLoginCode = async (email: string) => {
  return axios.post(`${API_URL}/auth/login/`, { email });
};

export const confirmLoginCode = async (email: string, code: string) => {
  return axios.post(`${API_URL}/auth/confirm/`, { email, code });
};