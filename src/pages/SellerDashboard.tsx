import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import '../styles/SellerDashboard.css';

interface IGood {
  id: string | number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  categoryId: string | number;
}

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'main' | 'schedule' | 'goods'>('main');
  const [goods, setGoods] = useState<IGood[]>([]);
  const [selectedGood, setSelectedGood] = useState<IGood | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', discountPrice: '', categoryId: '' });

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  const fetchGoods = async () => {
    try {
      const response = await api.get('/goods/');
      setGoods(response.data.items || []);
    } catch (err) {
      alert('Ошибка при загрузке товаров');
    }
  };

  useEffect(() => {
    if (activeTab === 'goods') fetchGoods();
  }, [activeTab]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateOrUpdate = async () => {
    const payload = {
      ...form,
      price: Number(form.price),
      discountPrice: Number(form.discountPrice) || undefined,
    };

    try {
      if (selectedGood) {
        await api.put(`/goods/${selectedGood.id}/`, payload);
      } else {
        await api.post('/goods/', payload);
      }
      setForm({ name: '', description: '', price: '', discountPrice: '', categoryId: '' });
      setSelectedGood(null);
      setIsCreating(false);
      fetchGoods();
    } catch {
      alert('Ошибка при сохранении товара');
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await api.delete(`/goods/${id}/`);
      fetchGoods();
      setSelectedGood(null);
    } catch {
      alert('Ошибка при удалении товара');
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setSelectedGood(null);
    setForm({ name: '', description: '', price: '', discountPrice: '', categoryId: '' });
  };

  return (
    <div>
      <div className="sd-dashboard-container">
        <div className="sd-sidebar">
          <button className={activeTab === 'main' ? 'sd-active' : ''} onClick={() => setActiveTab('main')}>Название и описание</button>
          <button className={activeTab === 'schedule' ? 'sd-active' : ''} onClick={() => setActiveTab('schedule')}>График продаж</button>
          <button className={activeTab === 'goods' ? 'sd-active' : ''} onClick={() => setActiveTab('goods')}>Товары</button>
          <button className="sd-logout-button" onClick={handleLogout}>Выйти</button>
        </div>

        <div className="sd-content">
          {activeTab === 'goods' && (
            <>
              <div className="sd-goods-header">
                <h2>Товары</h2>
                {!isCreating && !selectedGood && (
                  <button onClick={() => {
                    setIsCreating(true);
                    setSelectedGood(null);
                    setForm({ name: '', description: '', price: '', discountPrice: '', categoryId: '' });
                  }}>
                    Добавить товар
                  </button>
                )}
              </div>

              {(isCreating || selectedGood) && (
                <div className="sd-form-section">
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Название" />
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Описание (до 500 слов)" />
                  <div className="sd-price-row">
                    <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Цена" />
                    <input name="discountPrice" type="number" value={form.discountPrice} onChange={handleChange} placeholder="Цена по скидке" />
                  </div>
                  <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Категория" />
                  <div className="sd-form-actions">
                    <button onClick={handleCreateOrUpdate}>Сохранить</button>
                    {(selectedGood || isCreating) && (
                      <button onClick={handleCancel} style={{ background: '#eee' }}>Отмена</button>
                    )}
                    {selectedGood && (
                      <button className="sd-delete-button" onClick={() => handleDelete(selectedGood.id)}>🗑</button>
                    )}
                  </div>
                </div>
              )}

              {!selectedGood && !isCreating && (
                <div className="sd-goods-list">
                  {goods.map(good => (
                    <div key={good.id} className="sd-good-item" onClick={() => {
                      setSelectedGood(good);
                      setForm({
                        name: good.name,
                        description: good.description,
                        price: String(good.price),
                        discountPrice: good.discountPrice ? String(good.discountPrice) : '',
                        categoryId: String(good.categoryId),
                      });
                      setIsCreating(false);
                    }}>
                      <h4>{good.name}</h4>
                      <p>{good.description}</p>
                      <p>Цена: {good.price} {good.discountPrice ? ` (по скидке: ${good.discountPrice})` : ''}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'main' && <p>Настройки названия и описания магазина...</p>}
          {activeTab === 'schedule' && <p>График продаж будет тут...</p>}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
