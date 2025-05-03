import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import {
  Box, Paper, Typography, TextField, Button, Alert, Stack
} from '@mui/material';

function LoginForm({ onSwitch }) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{
        padding: 3,
        maxWidth: 400,
        margin: '0 auto',
        boxShadow: 'none',
        borderRadius: 0,
        backgroundColor: 'var(--panel-bg-color)'
      }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Вход</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 0
              }
            }}
              label="Логин"
              fullWidth
              {...register('username', { required: 'Введите логин' })}
              error={!!errors.username}
              helperText={errors.username?.message}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 0
              }
            }}
              label="Пароль"
              type="password"
              fullWidth
              {...register('password', { required: 'Введите пароль' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{
                borderRadius: 0,
                color: 'var(--text-color)',
                borderColor: 'var(--text-color)',
                textTransform: 'none'
              }}
            >
              Войти
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              onClick={onSwitch}
              sx={{ textTransform: 'none', color: 'var(--text-color)' }}
            >
              Нет аккаунта? Зарегистрироваться
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default LoginForm;
