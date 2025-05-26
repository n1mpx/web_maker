import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductPage.css';
import { getGood } from '../api/goods';
import { useBasket } from '../components/BasketContext';

interface Good {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  colors: string[];
  description?: string;
  fullDescription?: string;
  image?: string;
  reviewsList?: { name: string; text: string; rating: number }[];
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Good | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useBasket();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const response = await getGood(id);
        setProduct(response.data);
      } catch (err) {
        setError('Ошибка при загрузке товара');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Загрузка товара...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Товар не найден</p>;

  const handleAddToBasket = () => {
    const basketItem = {
      id: product.id,
      name: product.name,
      color: product.colors?.[0] || 'без цвета',
      quantity: 1,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
    };
    addItem(basketItem);
  };

  return (
    <div className="product-page">
      <div className="main-section">
        <div className="image-slider">
          <img src={product.image || '/images/default.png'} alt={product.name} className="main-image" />
        </div>

        <div className="info-section">
          <h1>
            <b>{product.title} {product.subtitle}</b> / {product.name}
          </h1>

          <div className="under-title-section">
            <div className="cart-description">
              {product.description} <br />{product.fullDescription}
            </div>

            <div className="colors">
              Цвет:
              {product.colors?.map((c, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: c,
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    margin: '0 5px',
                    border: '1px solid #ccc'
                  }}
                ></span>
              ))}
            </div>

            <div className="price-cart-row">
              <div className="price-block">
                <span className="label">Цена</span>
                <div className="price-line">
                  <span className="price">{product.price} ₽</span>
                  {product.oldPrice && <span className="old-price">{product.oldPrice} ₽</span>}
                </div>
              </div>

              <button className="add-to-cart" onClick={handleAddToBasket}>
                <img src="/images/shopping_cart.svg" width="30px" alt="Добавить в корзину" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="reviews-section">
          <h2>Отзывы</h2>
          <div>⭐ {product.rating} / {product.reviews} оценок</div>
          {product.reviewsList?.map((r, i) => (
            <div key={i} className="review">
              <strong>{r.name}</strong>: {r.text} ⭐ {r.rating}
            </div>
          ))}
        </div>

        <div>
          <h2>Похожие товары</h2>
          <p>Потом</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
