import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'http://localhost:5000/users';

// Регистрация
export const registerUser = createAsyncThunk('user/register', async (formData, { rejectWithValue }) => {
  const check = await fetch(`${URL}?username=${formData.username}`);
  const existing = await check.json();
  if (existing.length > 0) return rejectWithValue('Такой логин уже существует');

  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...formData, role: 'user' })
  });
  return await res.json();
});

// Вход
export const loginUser = createAsyncThunk('user/login', async (formData, { rejectWithValue }) => {
  const res = await fetch(`${URL}?username=${formData.username}&password=${formData.password}`);
  const users = await res.json();
  if (users.length === 0) return rejectWithValue('Неверный логин или пароль');
  return users[0];
});

// Обновление профиля
export const updateProfile = createAsyncThunk('user/update', async (user) => {
  const res = await fetch(`${URL}/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return await res.json();
});

// Загрузка сессии из localStorage и проверка на сервере
export const loadAuthFromStorage = createAsyncThunk('user/loadAuth', async (_, { rejectWithValue }) => {
  const stored = localStorage.getItem('user');
  if (!stored) return rejectWithValue();

  try {
    const parsed = JSON.parse(stored);
    const res = await fetch(`${URL}/${parsed.id}`);
    if (!res.ok) return rejectWithValue();

    const serverUser = await res.json();
    if (serverUser.username !== parsed.username) return rejectWithValue();

    return serverUser;
  } catch {
    return rejectWithValue();
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isAuth: false,
    error: null,
    loading: true
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuth = false;
      state.error = null;
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuth = true;
        state.error = null;
        state.loading = false;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Вход
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuth = true;
        state.error = null;
        state.loading = false;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Обновление профиля
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })

      // Загрузка авторизации
      .addCase(loadAuthFromStorage.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(loadAuthFromStorage.rejected, (state) => {
        state.currentUser = null;
        state.isAuth = false;
        state.loading = false;
        localStorage.removeItem('user');
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
