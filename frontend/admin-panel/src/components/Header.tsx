import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Header.css'; 

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="left-icon">
        <Link to="/catalog" className="icon-button" title="Каталог">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" className="icon">
            <path d="M6 2L3 6v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
          </svg>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="search-container">
        <svg className="search-icon" width="25" height="25" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Найти"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className="right-icons">
        <Link to="/basket" className="icon-button" title="Корзина">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" className="icon">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </Link>

        <Link to="/userPage" className="icon-button" title="Личный кабинет">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" className="icon">
            <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default Header;
