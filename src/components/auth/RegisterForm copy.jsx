import React from 'react';
import { useForm } from 'react-hook-form';
import './LoginForm.css';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/userSlice';

function RegisterForm({ onSwitch }) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="login-form">
      <h2>Регистрация</h2>

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

        <button type="submit">Зарегистрироваться</button>
      </form>      

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button onClick={onSwitch}>Уже есть аккаунт? Войти</button>
      </div>

      <p>{error && <p className="error" style={{ textAlign: 'center' }}>{error}</p>}</p>
      
    </div>
  );
}

export default RegisterForm;
