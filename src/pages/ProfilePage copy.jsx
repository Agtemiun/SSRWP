import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/userSlice';

function ProfilePage() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

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
    <div className="profile-page">
      <h2>Профиль</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин:</label>
          <input type="text" value={user.username} disabled />
        </div>

        <div>
          <label>Отображаемое имя:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div>
          <label>О себе:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">Сохранить</button>
        {saved && <p className="success">Сохранено!</p>}
      </form>
    </div>
  );
}

export default ProfilePage;
