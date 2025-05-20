import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage'; 
import HomePage from './pages/HomePage'; 
import ProductPage from './pages/ProductPage';
import Layout from './components/Layout';
import BasketPage from './pages/BasketPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/catalog" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/basket" element={<BasketPage/>}/>
          <Route path="/userPage" element={<UserPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
