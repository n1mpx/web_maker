import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Добавим другие маршруты позже */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
