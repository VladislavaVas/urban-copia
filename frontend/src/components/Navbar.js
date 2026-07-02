import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/', label: 'Главная' },
    { to: '/about', label: 'О нас' },
    { to: '/schedule', label: 'Расписание' },
    { to: '/contacts', label: 'Контакты' },
    { to: '/classes', label: 'Занятия' },
  ];
  if (user) links.push({ to: '/profile', label: 'Профиль' });
  if (user?.role === 'admin') links.push({ to: '/admin', label: 'Админ' });

  return (
    <nav className="navbar">
      {/* Кнопка для пропуска навигации (доступность) */}
      <a href="#main-content" className="skip-link">Перейти к содержанию</a>
      <div className="nav-container">
        <Link to="/" className="nav-brand">Урбанакадемия</Link>
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Меню">
          ☰
        </button>
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!user && <Link to="/login" className="nav-link">Вход</Link>}
          {user && <button onClick={() => { logout(); setIsOpen(false); }} className="nav-link logout-btn">Выйти</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;