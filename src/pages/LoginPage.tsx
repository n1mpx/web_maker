import { useState } from 'react';
import { sendLoginCode, confirmLoginCode, getUserInfo } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Если есть контекст авторизации — можно его сюда подключить:
  // const { login } = useAuthContext();

  const handleSendCode = async () => {
    if (!email.includes('@')) {
      setIsEmailValid(false);
      return;
    }

    try {
      await sendLoginCode(email);
      setIsCodeSent(true);
      setIsEmailValid(true);
      setError(null);
    } catch (error) {
      setError('Ошибка при отправке кода');
    }
  };

  const handleConfirmCode = async () => {
  setError(null);
  try {
    const response = await confirmLoginCode(email, code);
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);

    const userInfo = await getUserInfo();
    const userRole = userInfo.data.role;
    localStorage.setItem('userRole', userRole);

    if (userRole === 'seller') {
      navigate('/seller/dashboard');
    } else {
      navigate('/catalog');
    }

    window.location.reload();

  } catch (error) {
    setError('Ошибка при подтверждении кода');
  }
};

  const handleResendCode = () => {
    setCode('');
    setError(null);
    handleSendCode();
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        {!isCodeSent ? (
          <>
            <h2>Вход с помощью почты</h2>
            <input
              name='email'
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
                setIsEmailValid(true);
              }}
              className={!isEmailValid ? 'input-error' : ''}
            />
            {!isEmailValid && <p className="error-text">Введите корректный email</p>}
            <button onClick={handleSendCode}>Войти</button>
            <div className="agreement">
              <input type="checkbox" defaultChecked />
              <label>Соглашаюсь с правилами пользования торговой площадкой и возврата</label>
            </div>
            {error && <p className="error-text">{error}</p>}
          </>
        ) : (
          <>
            <h2>Введите код</h2>
            <p className="code-message">На почту вам пришло письмо с кодом</p>
            <input
              type="text"
              placeholder="Введите код"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
              }}
              className="code-input"
            />
            <button onClick={handleConfirmCode}>Подтвердить</button>
            <p className="resend-code" onClick={handleResendCode}>
              Запросить повторно
            </p>
            {error && <p className="error-text">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};
