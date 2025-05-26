import api from './axios';

export const getGoods = () => api.get('/goods');
export const getGood = (id: string) => api.get(`/goods/${id}`);
export const createGood = (data: unknown) => api.post('/goods', data);
export const updateGood = (id: string, data: unknown) => api.patch(`/goods/${id}`, data);
export const deleteGood = (id: string) => api.delete(`/goods/${id}`);
