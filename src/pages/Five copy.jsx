import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthInfo } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacks, addFeedback, deleteFeedback } from '../store/feedbackSlice';
import './Feedback.css';

function Five() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const username = useAuthInfo();

  // Получаем список отзывов из Redux
  const feedbacks = useSelector((state) => state.feedbacks);

  // Загрузка при монтировании
  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const onSubmit = useCallback((data) => {
    dispatch(addFeedback({
      name: username,
      message: data.message,
      createdAt: new Date().toISOString()
    }));
    reset();
  }, [dispatch, username, reset]);

  const handleDelete = useCallback((id) => {
    const ok = confirm('Удалить сообщение?');
    if (ok) dispatch(deleteFeedback(id));
  }, [dispatch]);

  return (
    <div className="feedback-page">
      <h2>Обратная связь</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="feedback-form">
        <div>
          <label>Сообщение:</label>
          <textarea {...register('message', { required: 'Введите сообщение' })}></textarea>
          {errors.message && <p className="error">{errors.message.message}</p>}
        </div>

        <button type="submit">Отправить</button>
      </form>

      <h3>Отзывы:</h3>
      <ul className="feedback-list">
        {feedbacks.map((f) => (
          <li key={f.id}>
            <strong>{f.name}</strong>: {f.message}
            <button className="delete-btn" onClick={() => handleDelete(f.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Five;
