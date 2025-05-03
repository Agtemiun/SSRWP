import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Paper, Typography, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminFeedbacks() {
  const user = useSelector((state) => state.user.currentUser);
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetch('http://localhost:5000/feedbacks')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data.reverse()))
      .catch((err) => console.error('[GET feedbacks]', err));
  }, [user, navigate]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Удалить сообщение?')) return;
    try {
      const res = await fetch(`http://localhost:5000/feedbacks/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      }
    } catch (e) {
      alert('Ошибка при удалении');
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
        backgroundColor: 'var(--panel-bg-color)'
      }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Отзывы пользователей</Typography>
        <ul>
          {feedbacks.map((f) => (
            <li key={f.id} style={{ marginBottom: '1rem' }}>
              <strong>{f.name}</strong>: {f.message}
              <Button
                size="small"
                onClick={() => handleDelete(f.id)}
                sx={{ ml: 1, borderRadius: 0, color: 'var(--text-color)' }}
              >
                Удалить
              </Button>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
}

export default AdminFeedbacks;
