import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'http://localhost:5000/feedbacks';

// Загрузка
export const fetchFeedbacks = createAsyncThunk('feedbacks/fetchAll', async () => {
  const res = await fetch(URL);
  const data = await res.json();
  return data.reverse(); // Новые сверху
});

// Добавление
export const addFeedback = createAsyncThunk('feedbacks/add', async (feedback) => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  return await res.json();
});

// Удаление
export const deleteFeedback = createAsyncThunk('feedbacks/delete', async (id) => {
  await fetch(`${URL}/${id}`, { method: 'DELETE' });
  return id;
});

const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.fulfilled, (_, action) => action.payload)
      .addCase(addFeedback.fulfilled, (state, action) => [action.payload, ...state])
      .addCase(deleteFeedback.fulfilled, (state, action) =>
        state.filter((f) => f.id !== action.payload)
      );
  },
});

export default feedbackSlice.reducer;
