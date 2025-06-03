import React from 'react';
import { IBasketItem } from '../../types';

interface BasketSummaryProps {
  items: IBasketItem[];
}

const BasketSummary: React.FC<BasketSummaryProps> = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="summary">
      <p>{items.length} товар(ов)</p>
      <p>Доставка: при оформлении</p>
      <strong>Итого: {total.toLocaleString()} ₽</strong>
    </div>
  );
};

export default BasketSummary;
