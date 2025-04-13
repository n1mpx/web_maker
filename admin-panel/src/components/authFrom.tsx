import { useState } from 'react';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1 - ввод email, 2 - ввод кода

  const handleSendEmail = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Ошибка отправки email');
      setStep(2);  // Переходим к следующему шагу (ввод кода)
    } catch (err) {
      console.error(err);
      setError('Ошибка при отправке кода');
    }
  };

  const handleConfirmCode = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/login/confirm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Неверный код');

      // Сохраняем токен в localStorage
      localStorage.setItem('token', data.access);
      alert('Успешный вход!');

      // Редирект или дальнейшая логика
      // window.location.href = '/products'
    } catch (err) {
      console.error(err);
      setError('Ошибка подтверждения кода');
    }
  };

  return (
    <div>
      {step === 1 && (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
          />
          <button onClick={handleSendEmail}>Отправить код</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Введите код"
          />
          <button onClick={handleConfirmCode}>Подтвердить</button>
        </>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default AuthForm;