import React from 'react';
import './Header.css';
import { useLoginState, useAuthActions, useAuthInfo } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Header({ selectedButtonData }) {

  const isAuth = useLoginState();
  const { logout } = useAuthActions();
  const username = useAuthInfo();

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.getAttribute("theme") === "dark") {
      root.removeAttribute("theme");
    } else {
      root.setAttribute("theme", "dark");
    }
  };    

  return (
    <header className="header" Theme="dark">
      <div className="header-left">
        <button className="theme-toggle" onClick={toggleTheme} title="Сменить тему">
          🌓
        </button>
      </div>

      <div className="header-center">
        <h1>{selectedButtonData ? selectedButtonData.Name : "Лорем ипсум..."}</h1>
      </div>

      <div className="header-right">
        {/* потом будет имя пользователя и мини-меню */}
        <div className="user-info">
          {isAuth ? (
            <>
              <span>
                <Link to="/profile" className="profile-link">{username}</Link>
              </span>
              <button className="logout-btn" onClick={logout}>Выйти</button>
            </>
          ) : (
            <span>Гость</span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;