import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import HomePage from './pages/HomePage'; 
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/catalog" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} /> {/* Новый маршрут */}
      </Routes>
    </BrowserRouter>
  );
}



export default App;
