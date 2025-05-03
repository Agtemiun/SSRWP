import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/userSlice';

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert
} from '@mui/material';

function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setBio(user.bio || '');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;
    dispatch(updateProfile({ ...user, displayName, bio }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <Box sx={{ padding: 3 }}>
      <Paper
        sx={{
          padding: 3,
          maxWidth: 600,
          margin: '0 auto',
          boxShadow: 'none',         // убрать тень
          borderRadius: 0,           // убрать скругления
          backgroundColor: 'var(--panel-bg-color)', // поддержка темы
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Профиль
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 0
              }
            }}
              label="Логин"
              value={user.username}
              fullWidth
              disabled
              InputLabelProps={{ shrink: true }}
            />

            <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 0
              }
            }}
              label="Отображаемое имя"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 0
              }
            }}
              label="О себе"
              multiline
              minRows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
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
              Сохранить
            </Button>

            {saved && <Alert severity="success">Сохранено!</Alert>}
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default ProfilePage;
