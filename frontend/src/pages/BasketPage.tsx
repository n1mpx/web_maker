import React from 'react';
import { useBasket } from '../components/BasketContext';
import '../styles/BasketPage.css';

const BasketPage = () => {
  const { items, removeItem, updateQuantity } = useBasket();

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="basket-page">
      <div className="basket-left">
        <h2>
          Корзина <span className="item-count">{totalCount} товар{totalCount > 1 ? 'ов' : ''}</span>
        </h2>

        {items.length === 0 && <p>Корзина пуста</p>}

        {items.map(item => (
          <div className="basket-item" key={item.id}>
            <img src={item.image} alt={item.name} className="item-image" />

            <div className="item-info">
              <b>{item.name}</b> / <span className="sub-title">{item.name}</span>
              <div>Цвет: {item.color}</div>
              <div>Количество: {item.quantity}</div>
              <div className="item-price">
                <span className="price">{item.price} ₽</span>
                {item.oldPrice && <span className="old-price">{item.oldPrice} ₽</span>}
              </div>
            </div>

            <div className="item-actions">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeItem(item.id)}>✖</button>
            </div>
          </div>
        ))}
      </div>

      <div className="basket-right">
        <button className="checkout-button">Перейти к оформлению</button>

        <div className="summary-row">
          <span>{totalCount} товар{totalCount > 1 ? 'ов' : ''}</span>
          <span>{totalPrice} ₽</span>
        </div>

        <div className="summary-row">
          <span>Доставка</span>
          <span>при оформлении</span>
        </div>

        <div className="summary-total">
          <b>Итого</b>
          <b>{totalPrice} ₽</b>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
