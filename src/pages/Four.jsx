import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../store/counterSlice';

function Four() {
  // локальный useState
  const [localCount, setLocalCount] = useState(0);

  useEffect(() => {
    console.log('Компонент Four смонтирован');

    return () => {
      console.log('Компонент Four размонтирован');
    };
  }, []);

  // Redux State
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter</h2>

      <div>
        <strong>Redux-счётчик:</strong> {count} &nbsp;
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>

      <div style={{ marginTop: '1em' }}>
        <strong>Локальный счётчик (useState):</strong> {localCount} &nbsp;
        <button onClick={() => setLocalCount((c) => c + 1)}>+</button>
        <button onClick={() => setLocalCount((c) => c - 1)}>-</button>
      </div>
    </div>
  );
}

export default Four;
