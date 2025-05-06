import React from 'react';
import { Link } from 'react-router-dom';
import './GoodsList.css';
import { dummyGoods } from './GoodsBD';


const GoodsList = () => {
  return (
    <div className="goods-grid">
      {dummyGoods.map((item) => (
        <Link to={`/product/${item.id}`} key={item.id} className="goods-card">
          <div className="product-image-row"><img src={item.image} alt={item.name} className="product-image" /></div>
          <div className="product-content">
            <div className="product-title">{item.title}</div>
            <div className="product-subtitle">{item.subtitle}</div>
            <div className="product-pricing">
              <span className="price">{item.price} ₽</span>
              <span className="old-price">{item.oldPrice} ₽</span>
            </div>
            <div className="description">{item.name}</div>
            <div className="rating">⭐ {item.rating} / {item.reviews} оценок</div>
            <div className="delivery">{item.delivery}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GoodsList;
