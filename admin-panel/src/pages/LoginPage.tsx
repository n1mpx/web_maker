// src/pages/LoginPage.tsx
import { useState } from 'react';
import { sendLoginCode, confirmLoginCode } from '../services/authService';
import axios from 'axios';
import '../styles/LoginPage.css'

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
      localStorage.setItem('token', response.data.accessToken);
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
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Вход с помощью почты</h2>
        <input
          type="email"
          placeholder="@"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isCodeSent ? (
          <button onClick={handleSendCode}>войти</button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Введите код"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleConfirmCode}>Подтвердить</button>
          </>
        )}
        <div className="agreement">
          <input type="checkbox" defaultChecked />
          <label>Соглашаюсь с правилами пользования торговой площадкой и возврата</label>
        </div>
      </div>
    </div>
  );  
};