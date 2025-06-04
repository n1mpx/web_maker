import React, { createContext, useContext, useEffect, useState } from 'react';
import { addToBasket, updateBasketItem, deleteBasketItem, getBasketItems } from '../api/basket';

export type BasketItemType = {
  id: number;
  goodId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  color?: string;
  oldPrice?: number;
};

// Новый тип для добавления в корзину — только id товара и количество
type AddItemInput = {
  goodId: number;
  quantity: number;
};

type BasketContextType = {
  items: BasketItemType[];
  addItem: (item: AddItemInput) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<BasketItemType[]>([]);

  const reloadItems = async () => {
    try {
      const serverItems = await getBasketItems();
      setItems(
        serverItems.map((item: any) => ({
          id: item.id,
          goodId: item.good.id,
          name: item.good.name,
          price: item.good.price,
          quantity: item.count, // count из сериализатора
          image: item.good.image,
          color: item.color || 'черный',
          oldPrice: item.good.oldPrice, // если есть
        }))
      );
    } catch (error) {
      console.error('Failed to load basket items', error);
      setItems([]);
    }
  };

  useEffect(() => {
    reloadItems();
  }, []);

  const addItem = async (item: AddItemInput) => {
    try {
      // Передаем только goodId и quantity
      await addToBasket(item.goodId, item.quantity);
      await reloadItems();
    } catch (error: any) {
      console.error('Ошибка при добавлении в корзину:', error.message || error);
    }
  };

  const removeItem = async (id: number) => {
    try {
      await deleteBasketItem(id);
      await reloadItems();
    } catch (error) {
      console.error('Failed to delete basket item', error);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    try {
      if (quantity < 1) return;
      await updateBasketItem(id, quantity);
      await reloadItems();
    } catch (error) {
      console.error('Failed to update basket item', error);
    }
  };

  return (
    <BasketContext.Provider value={{ items, addItem, removeItem, updateQuantity }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) throw new Error('useBasket must be used within a BasketProvider');
  return context;
};
