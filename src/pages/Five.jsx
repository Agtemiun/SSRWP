import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
  Box, Paper, Typography, TextField, Button, Alert, Stack
} from '@mui/material';

function Five() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const username = useSelector((state) => state.user.currentUser?.username);

  const user = useSelector((state) => state.user.currentUser);
  const isAdmin = user?.role === 'admin';

  

  useEffect(() => {
    fetch('http://localhost:5000/feedbacks')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data.reverse()))
      .catch((err) => console.error('[GET feedbacks]', err));
  }, []);

  const onSubmit = useCallback(async (data) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: username,
          message: data.message,
          createdAt: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        setError('Ошибка при отправке');
        return;
      }

      const saved = await response.json();
      setFeedbacks((prev) => [saved, ...prev]);
      reset();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error('[POST feedback]', err);
      setError('Сетевая ошибка');
    }
  }, [username, reset]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Удалить сообщение?')) return;
    try {
      const res = await fetch(`http://localhost:5000/feedbacks/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert('Ошибка при удалении');
      }
    } catch (e) {
      console.error('[DELETE feedback]', e);
      alert('Сетевая ошибка при удалении');
    }
  }, []);

  return (

    <Box sx={{ padding: 3 }}>
      <Paper sx={{
        padding: 3,
        maxWidth: 700,
        margin: '0 auto',
        boxShadow: 'none',
        borderRadius: 0,
        backgroundColor: 'var(--container-bg-color)'
      }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Обратная связь
        </Typography>

        {isAdmin && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Сообщение"
                multiline
                minRows={3}
                fullWidth
                {...register('message', { required: 'Введите сообщение' })}
                error={!!errors.message}
                helperText={errors.message?.message}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0, color: 'var(--text-color)',
                    borderColor: 'var(--text-color)',
                  }
                }}
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
                Отправить
              </Button>

              {success && <Alert severity="success">Сообщение отправлено</Alert>}
              {error && <Alert severity="error">{error}</Alert>}
            </Stack>
          </form>
        )}

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Отзывы:
        </Typography>
        <ul>
          {feedbacks.map((f) => (
            <li key={f.id} style={{ marginBottom: '1rem' }}>
              <strong>{f.name}</strong>: {f.message}
              {isAdmin && (
              <Button
                onClick={() => handleDelete(f.id)}
                variant="text"
                size="small"
                sx={{ color: 'var(--text-color)', ml: 1, borderRadius: 0 }}
              >
                Удалить
              </Button>
              )}
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
}

export default Five;
