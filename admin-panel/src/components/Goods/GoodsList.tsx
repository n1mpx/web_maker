// src/components/Goods/GoodsList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './GoodsList.css';

const dummyGoods = [
  { id: 1, name: 'Кроссовки Nike', price: 4999, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Футболка Adidas', price: 1999, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Сумка Puma', price: 2999, image: 'https://via.placeholder.com/150' },
];

const GoodsList = () => {
  return (
    <div className="goods-grid">
      {dummyGoods.map((item) => (
        <Link to={`/product/${item.id}`} key={item.id} className="goods-card">
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.price} ₽</p>
          <button onClick={(e) => e.preventDefault()}>В корзину</button>
        </Link>
      ))}
    </div>
  );
};

export default GoodsList;
