import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AccountPage.css';

const AccountPage = () => {
  const [username, setUsername] = useState('Пользователь');
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(username);
  const [activeTab, setActiveTab] = useState<'orders' | 'returns' | 'purchases' | 'settings' | 'help'>('orders');
  const [avatar, setAvatar] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSaveName = () => {
    setUsername(newName.trim() || 'Пользователь');
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="account-container">
      <aside className="sidebar">
        <div className="avatar-section">
          <label htmlFor="avatar-upload">
            <div
              className="avatar"
              style={{
                backgroundImage: avatar ? `url(${avatar})` : 'none',
                backgroundColor: avatar ? 'transparent' : '#ccc',
              }}
              title="Нажмите, чтобы изменить аватар"
            />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />

            <h2>
            {editing ? (
                <>
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') setEditing(false);
                    }}
                />
                </>
            ) : (
                <>
                <span>{username}</span>
                <button onClick={() => setEditing(true)} title="Редактировать имя">✎</button>
                </>
            )}
            </h2>

        </div>

        

        <nav className="tabs">
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Заказы</button>
          <button className={activeTab === 'returns' ? 'active' : ''} onClick={() => setActiveTab('returns')}>Возвраты</button>
          <button className={activeTab === 'purchases' ? 'active' : ''} onClick={() => setActiveTab('purchases')}>Покупки</button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Настройки</button>
          <button className={activeTab === 'help' ? 'active' : ''} onClick={() => setActiveTab('help')}>Помощь</button>

        </nav>
        <button className="logout-button" onClick={handleLogout}>Выйти</button>

      </aside>

      <section className="tab-content">
        {activeTab === 'orders' && <div> <div className='title'><h3>Мои заказы</h3> </div> <p>Здесь будет список заказов.</p></div>}
        {activeTab === 'returns' && <div> <div className='title'><h3>Возвраты</h3> </div> <p>Здесь отображаются возвраты.</p></div>}
        {activeTab === 'purchases' && <div> <div className='title'><h3>Покупки</h3> </div> <p>История покупок пользователя.</p></div>}
        {activeTab === 'settings' && (
        <div>
            <div className='title'>
            <h3>Настройки</h3>
            </div>
            <label>Email-уведомления: <input type="checkbox" /></label><br />
            <label>Тёмная тема: <input type="checkbox" /></label>
        </div>
        )}
        {activeTab === 'help' && <div><div className='title'><h3>Помощь</h3> </div> <p>Ответы на частые вопросы и контакты поддержки.</p></div>}
      </section>
    </div>
  );
};

export default AccountPage;
