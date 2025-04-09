import axios from "axios";

const API_URL = 'http://localhost:3000'; // или адрес бэкенда

export const getGoods = () => axios.get(`${API_URL}/api/v1/goods`);
export const getGood = (id: string) => axios.get(`${API_URL}/api/v1/goods/${id}`);
export const createGood = (data: unknown) => axios.post(`${API_URL}/api/v1/goods`, data);
export const updateGood = (id: string, data: unknown) => axios.patch(`${API_URL}/api/v1/goods/${id}`, data);
export const deleteGood = (id: string) => axios.delete(`${API_URL}/api/v1/goods/${id}`);
