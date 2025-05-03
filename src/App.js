import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './components/mainPage/MainPage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { loadAuthFromStorage } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuth, loading } = useSelector((state) => state.user);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

  if (loading) return null;

  return isAuth ? (
    <MainPage />
  ) : showLogin ? (
    <LoginForm onSwitch={() => setShowLogin(false)} />
  ) : (
    <RegisterForm onSwitch={() => setShowLogin(true)} />
  );
}

export default App;
