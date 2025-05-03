import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Paper, Typography, Table, TableHead, TableBody, TableRow,
  TableCell, Button
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

function AdminUsers() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/'); // Защита от доступа
      return;
    }

    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error('[GET users]', err));
  }, [currentUser, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить пользователя?')) return;
    try {
      await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert('Ошибка при удалении');
    }
  };

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Логин', accessor: 'username' },
    { Header: 'Роль', accessor: 'role' },
  ], []);

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{
        padding: 3,
        boxShadow: 'none',
        borderRadius: 0,
        backgroundColor: 'var(--panel-bg-color)'
      }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Список пользователей</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Логин</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => handleDelete(u.id)}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 0,
                      color: 'var(--text-color)'
                    }}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default AdminUsers;
