import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './GoodsList.css';
import { getGoods } from '../../api/goods';

interface Good {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  delivery?: string;
  image?: string;
}

const GoodsList = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await getGoods();
        const items = response.data.items || response.data;
        setGoods(items);
      } catch (err) {
        setError('Не удалось загрузить товары');
      } finally {
        setLoading(false);
      }
    };

    fetchGoods();
  }, []);

  if (loading) return <div>Загрузка товаров...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="goods-grid">
      {goods.map((item) => (
        <Link to={`/product/${item.id}`} key={item.id} className="goods-card">
          <div className="product-image-row">
            <img src={item.image || '/images/default.png'} alt={item.name} className="product-image" />
          </div>
          <div className="product-content">
            <div className="product-title">{item.title}</div>
            <div className="product-subtitle">{item.subtitle}</div>
            <div className="product-pricing">
              <span className="price">{item.price} ₽</span>
              {item.oldPrice && <span className="old-price">{item.oldPrice} ₽</span>}
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
