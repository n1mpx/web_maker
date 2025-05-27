import api from './axios';

api.defaults.withCredentials = true;

const BASE_URL = '/me/basket-items/';

export const addToBasket = async (goodId: number, count: number) => {
  console.log({ goodId, count });
  const res = await api.post(BASE_URL, { goodId, count });
  return res.data; // ожидается объект корзинного товара
};

export const getBasketItems = async () => {
  try {
    const res = await api.get(BASE_URL);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch basket items', error);
    return [];
  }
};

export const updateBasketItem = async (id: number, count: number) => {
  const res = await api.patch(`${BASE_URL}/${id}`, { count });
  return res.data;
};

export const deleteBasketItem = async (id: number) => {
  const res = await api.delete(`${BASE_URL}/${id}`);
  return res.data;
};
