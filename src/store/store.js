import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import feedbackReducer from './feedbackSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    feedbacks: feedbackReducer,
    user: userReducer,
  },
});

export default store;
