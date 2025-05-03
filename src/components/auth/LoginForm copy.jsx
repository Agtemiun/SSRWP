import React from 'react';
import { useForm } from 'react-hook-form';
import './LoginForm.css';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/userSlice';

function LoginForm({ onSwitch }) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="login-form">
      <h2>Вход</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Логин</label>
          <input {...register('username', { required: 'Введите логин' })} />
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        <div>
          <label>Пароль</label>
          <input type="password" {...register('password', { required: 'Введите пароль' })} />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit">Войти</button>
      </form>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button onClick={onSwitch}>Нет аккаунта? Зарегистрироваться</button>
      </div>

      <p>{error && <p className="error" style={{ textAlign: 'center' }}>{error}</p>}</p>
    </div>
  );
}

export default LoginForm;
