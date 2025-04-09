// src/pages/LoginPage.tsx
import { useState } from 'react';
import { sendLoginCode, confirmLoginCode } from '../services/authService';
import axios from 'axios';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = async () => {
    try {
      await sendLoginCode(email);
      alert('Код отправлен на почту');
      setIsCodeSent(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Ошибка при отправке кода');
      } else {
        alert('Произошла неизвестная ошибка');
      }
    }
  };

  const handleConfirmCode = async () => {
    try {
      const response = await confirmLoginCode(email, code);
      localStorage.setItem('token', response.data.accessToken); // сохраняем токен
      alert('Успешная авторизация!');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Ошибка при подтверждении кода');
      } else {
        alert('Произошла неизвестная ошибка');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Авторизация</h2>
      <input
        type="email"
        placeholder="Введите email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isCodeSent ? (
        <button onClick={handleSendCode}>Отправить код</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Введите код"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={handleConfirmCode}>Войти</button>
        </>
      )}
    </div>
  );
};
