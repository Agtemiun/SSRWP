import React from 'react';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';
import { Link } from 'react-router-dom';

function Header({ selectedButtonData }) {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser);

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
        <div className="user-info">
          {isAuth && user ? (
            <>
              <span>
                <Link to="/profile" className="profile-link">{user.username}</Link>
              </span>
              <button className="logout-btn" onClick={() => dispatch(logout())}>Выйти</button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
