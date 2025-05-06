import { useParams } from 'react-router-dom';
import { dummyGoods } from '../components/Goods/GoodsBD';
import './ProductPage.css';


const ProductPage = () => {
  const { id } = useParams();
  const product = dummyGoods.find((item) => item.id === Number(id));

  if (!product) return <p>Товар не найден</p>;

  return (
    <div className="product-page">
      <div className="main-section">
        <div className="image-slider">
          <img src={product.image} alt={product.name} className="main-image" />
        </div>

        <div className="info-section">
          <h1>
            <b>{product.title} {product.subtitle}</b>/ {product.name}
          </h1>

          <div className="cart-description">{product.description} <br />{product.fullDescription} </div>

          <div className="colors">
            Цвет 
            {product.colors.map((c, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: c,
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  margin: '0 5px',
                }}
              ></span>
            ))}
          </div>

          <div className="price-cart-row">
            <div className="price-block">
              <span className="label">Цена</span>
              <div className="price-line">
                <span className="price">{product.price} ₽</span>
                <span className="old-price">{product.oldPrice} ₽</span>
              </div>
            </div>
            <button className="add-to-cart">
              <img src="/images/shopping_cart.svg" alt="Добавить в корзину" />
            </button>
          </div>

        </div>

      </div>

      <div className="reviews-section">
        <h2>Отзывы</h2>
        <div>⭐ {product.rating} / {product.reviews} оценок</div>
        {product.reviewsList.map((r, i) => (
          <div key={i} className="review">
            <strong>{r.name}</strong>: {r.text} ⭐ {r.rating}
          </div>
        ))}
      </div>

      <div className="related-section">
        <h2>Похожие товары</h2>
        <p>Потом</p>
      </div>
    </div>
  );
};

export default ProductPage;
