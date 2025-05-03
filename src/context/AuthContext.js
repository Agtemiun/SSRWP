import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Компонент-провайдер
export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [username, setUsername] = useState(null);

  // При загрузке проверяем localStorage
  useEffect(() => {
    const saved = localStorage.getItem('auth') === 'true';
    const user = localStorage.getItem('username');
    console.log('[AuthProvider] loaded isAuth from localStorage:', saved);
    setIsAuth(saved);
    setUsername(user);
  }, []);

  const login = (loginName) => {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('username', loginName);
    setIsAuth(true);
    setUsername(loginName);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    setIsAuth(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// хук для получения статуса авторизации
export function useLoginState() {
  return useContext(AuthContext).isAuth;
}

// хук для получения login/logout
export function useAuthActions() {
  const { login, logout } = useContext(AuthContext);
  return { login, logout };
}

export function useAuthInfo() {
    const { username } = useContext(AuthContext);
    return username;
  }
