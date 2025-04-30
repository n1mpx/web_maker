// src/pages/HomePage.tsx
import React from 'react';
import GoodsList from '../components/Goods/GoodsList';

const HomePage = () => {
  return (
    <div>
      <h1>Каталог товаров</h1>
      <GoodsList />
      <p>Здесь типо каталог товаров</p>
    </div>
  );
};

export default HomePage;
