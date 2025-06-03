import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Layout from './components/Layout';
import BasketPage from './pages/BasketPage';
import ProfilePage from './pages/ProfilePage';
import { BasketProvider } from './components/BasketContext';
import SellerDashboard from './pages/SellerDashboard'
import CheckoutPage from './pages/CheckoutPage';



function App() {
  return (
    <BasketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/catalog" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/userPage" element={<ProfilePage />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BasketProvider>
  );
}

export default App;
