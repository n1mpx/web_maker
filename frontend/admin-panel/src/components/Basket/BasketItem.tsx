import React from 'react';
import { BasketItemType, useBasket } from '../BasketContext';

const BasketItem: React.FC<{ item: BasketItemType }> = ({ item }) => {
  const { removeItem } = useBasket();

  return (
    <div className="basket-item">
      <img src={item.image} alt={item.name} width={80} />
      <div className="info">
        <strong>{item.name}</strong>
        <p>Цвет: {item.color}</p>
        <p>Количество: {item.quantity}</p>
        <p>
          Цена: <strong>{item.price}</strong>{' '}
          {item.oldPrice && <s>{item.oldPrice}</s>}
        </p>
      </div>
      <button onClick={() => removeItem(item.id)}>✖</button>
    </div>
  );
};

export default BasketItem;
