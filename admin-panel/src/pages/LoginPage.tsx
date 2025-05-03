import { useState } from 'react';
import { sendLoginCode, confirmLoginCode } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPage.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleSendCode = async () => {
    if (!email.includes('@')) {
      setIsEmailValid(false);
      return;
    }
    
    try {
      await sendLoginCode(email);
      setIsCodeSent(true);
      setIsEmailValid(true);
    } catch (error) {
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
      navigate('/catalog')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Ошибка при подтверждении кода');
      } else {
        alert('Произошла неизвестная ошибка');
      }
    }
  };

  const handleResendCode = () => {
    setCode('');
    handleSendCode();
  };

  const navigate = useNavigate();


  return (
    <div className="login-wrapper">
      <div className="login-box">
        {!isCodeSent ? (
          <>
            <h2>Вход с помощью почты</h2>
            <input
              type="email"
              placeholder="@"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={!isEmailValid ? 'input-error' : ''}
            />
            {!isEmailValid && <p className="error-text">Введите корректный email</p>}
            <button onClick={handleSendCode}>Войти</button>
            <div className="agreement">
              <input type="checkbox" defaultChecked />
              <label>Соглашаюсь с правилами пользования торговой площадкой и возврата</label>
            </div>
          </>
        ) : (
          <>
            <h2>Введите код</h2>
            <p className="code-message">На почту вам пришло письмо с кодом</p>
            <input
              type="text"
              placeholder="Введите код"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="code-input"
            />
            <button onClick={handleConfirmCode}>Подтвердить</button>
            <p className="resend-code" onClick={handleResendCode}>
              Запросить повторно
            </p>
          </>
        )}
        
      </div>
    </div>
  );
};