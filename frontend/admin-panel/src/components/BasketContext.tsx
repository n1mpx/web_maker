import React, { createContext, useState, useContext } from 'react';

export type BasketItemType = {
  id: number;
  name: string;
  color: string;
  quantity: number;
  price: number;
  oldPrice?: number;
  image: string;
};

type BasketContextType = {
  items: BasketItemType[];
  addItem: (item: BasketItemType) => void;
  removeItem: (id: number) => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BasketItemType[]>([]);

  const addItem = (item: BasketItemType) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <BasketContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) throw new Error("useBasket must be used within BasketProvider");
  return context;
};
