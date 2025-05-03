// src/pages/ProductPage.tsx
import { useParams } from 'react-router-dom';

const dummyGoods = [
  { id: 1, name: 'Кроссовки Nike', price: 4999, image: 'https://via.placeholder.com/150', description: 'Спортивная обувь' },
  { id: 2, name: 'Футболка Adidas', price: 1999, image: 'https://via.placeholder.com/150', description: 'Хлопковая футболка' },
  { id: 3, name: 'Сумка Puma', price: 2999, image: 'https://via.placeholder.com/150', description: 'Удобная сумка' },
];

const ProductPage = () => {
  const { id } = useParams();
  const product = dummyGoods.find((item) => item.id === Number(id));

  if (!product) return <p>Товар не найден</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>{product.price} ₽</p>
      <button>Добавить в корзину</button>
    </div>
  );
};

export default ProductPage;
