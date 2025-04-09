import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import AuthForm from './components/authFrom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<AuthForm />} />
        {/* Добавим другие маршруты позже */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
