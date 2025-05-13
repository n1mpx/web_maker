import React from 'react';
import { useBasket } from '../BasketContext';

const BasketSummary = () => {
  const { items } = useBasket();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="summary">
      <button>Перейти к оформлению</button>
      <p>{items.length} товар(ов)</p>
      <p>Доставка: при оформлении</p>
      <strong>Итого: {total}</strong>
    </div>
  );
};

export default BasketSummary;
