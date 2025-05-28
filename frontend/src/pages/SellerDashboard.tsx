import React, { useEffect, useState } from 'react';
import api from '../api/axios'; 

interface IGood {
  id: string | number;
  name: string;
  description: string;
  price: number;
  categoryId: string | number;
}

const SellerDashboard = () => {
  const [goods, setGoods] = useState<IGood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Поля формы создания товара
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [categoryId, setCategoryId] = useState<string | number>('');

  useEffect(() => {
    fetchGoods();
  }, []);

  const fetchGoods = async () => {
    try {
      setLoading(true);
      const response = await api.get('/goods/');
      setGoods(response.data.items || []);
      setError(null);
    } catch {
      setError('Ошибка при загрузке товаров');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGood = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || price === '' || !categoryId) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const newGood = { name, description, price: Number(price), categoryId };
      const response = await api.post('/goods/', newGood);

      setGoods(prev => [...prev, response.data]);

      // Очистка формы
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId('');
      setError(null);
    } catch (err) {
      setError('Ошибка при создании товара');
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Мои товары</h1>

      {goods.length === 0 && <p>Товаров нет</p>}

      {goods.map(good => (
        <div key={good.id} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
          <h2>{good.name}</h2>
          <p>{good.description}</p>
          <p>Цена: {good.price}</p>
          <p>Категория: {good.categoryId}</p>
        </div>
      ))}

      <h2>Добавить новый товар</h2>
      <form onSubmit={handleCreateGood}>
        <div>
          <label>Название:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Описание:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Цена:</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
            required
            min="0"
          />
        </div>
        <div>
          <label>Категория (ID):</label>
          <input
            type="text"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Создать товар</button>
      </form>
    </div>
  );
};

export default SellerDashboard;
