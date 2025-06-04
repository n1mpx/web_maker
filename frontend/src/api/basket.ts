import api from './axios';

api.defaults.withCredentials = true;

const BASE_URL = '/me/basket-items'; // 🔧 УБРАЛ слэш на конце

export const addToBasket = async (goodId: number, count: number) => {
  console.log({ goodId, count });
  const res = await api.post(`${BASE_URL}/`, { goodId, count });
  return res.data;
};

export const getBasketItems = async () => {
  try {
    const res = await api.get(`${BASE_URL}/`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch basket items', error);
    return [];
  }
};

export const updateBasketItem = async (id: number, count: number) => {
  const res = await api.patch(`${BASE_URL}/${id}/`, { count }); // ✅ правильный URL
  return res.data;
};

export const deleteBasketItem = async (id: number) => {
  const res = await api.delete(`${BASE_URL}/${id}/`); // ✅ правильный URL
  return res.data;
};
