import { useState } from 'react';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/v1/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так');
      }

      alert('Код отправлен на вашу почту');
    } catch (err) {
      console.error(err); // <-- добавлено, чтобы не ругался ESLint
      setError('Ошибка при отправке кода');
    }
  };

  return (
    <div>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Введите email" 
      />
      <button onClick={handleSubmit}>Отправить код</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default AuthForm;
