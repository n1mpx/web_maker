import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductPage.css';
import { getGood } from '../api/goods';
import { useBasket } from '../components/BasketContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Good | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useBasket();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const response = await getGood(id);
        setProduct(response.data);
      } catch {
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
    addItem({ goodId: product.id, quantity: 1 });
  };

  const images = product.images?.length ? product.images : null;
  const mainImage = images?.[currentImageIndex]?.image || product.image || '/images/default.png';

  return (
    <div className="product-page">
      <div className="main-section">
        <div className="image-slider">
          <img
            src={mainImage}
            alt={product.name}
            className="main-image"
          />
          {images && images.length > 1 && (
            <div className="thumbnail-row">
              {images.map((img, i) => (
                <img
                  key={img.id}
                  src={img.thumbnail || img.image}
                  alt={`preview-${i}`}
                  className={`thumbnail ${i === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(i)}
                  style={{
                    cursor: 'pointer',
                    marginRight: 8,
                    width: 60,
                    height: 60,
                    border: i === currentImageIndex ? '2px solid #333' : '1px solid #ccc',
                    borderRadius: 4
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="info-section">
          <h1>
            <b>{product.title || ''} {product.subtitle || ''}</b> / {product.name}
          </h1>

          <div className="under-title-section">
            <div className="cart-description">
              {product.description || 'Описание отсутствует'} <br />
              {product.fullDescription || ''}
            </div>

            <div className="colors">
              Цвет: 
              {(product.colors && product.colors.length > 0)
                ? product.colors.map((c, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: c,
                        display: 'inline-block',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        margin: '0 5px',
                        border: '1px solid #ccc',
                      }}
                    />
                  ))
                : 'Нет данных'}
            </div>

            <div className="price-cart-row">
              <div className="price-block">
                <span className="label">Цена</span>
                <div className="price-line">
                  <span className="price">{product.price} ₽</span>
                  {product.oldPrice && (
                    <span className="old-price">{product.oldPrice} ₽</span>
                  )}
                </div>
              </div>

              <button className="add-to-cart" onClick={handleAddToBasket}>
                <img
                  src="/images/shopping_cart.svg"
                  width={30}
                  alt="Добавить в корзину"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="reviews-section">
          <h2>Отзывы</h2>
          <div>
            ⭐ {product.rating ?? '—'} / {product.reviews ?? '—'} оценок
          </div>
          {(product.reviewsList && product.reviewsList.length > 0)
            ? product.reviewsList.map((r, i) => (
                <div key={i} className="review">
                  <strong>{r.name}</strong>: {r.text} ⭐ {r.rating}
                </div>
              ))
            : <p>Отзывы отсутствуют</p>
          }
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
