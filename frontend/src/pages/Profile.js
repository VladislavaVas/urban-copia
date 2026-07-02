import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: '', email: '', avatar: '' });
  const [enrollments, setEnrollments] = useState([]);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [message, setMessage] = useState('');

  const fetchEnrollments = async () => {
    try {
      const res = await api.get('/classes/my-enrollments');
      setEnrollments(res.data);
    } catch (err) {
      console.error('Ошибка загрузки записей:', err);
    }
  };

  useEffect(() => {
    api.get('/users/profile').then(res => setProfile(res.data));
    fetchEnrollments();
  }, []);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const res = await api.post('/users/avatar', formData);
      setProfile({ ...profile, avatar: res.data.avatar });
      setMessage('Аватар обновлён');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      alert('Ошибка загрузки');
    }
  };

  const changePassword = async () => {
    if (!oldPass || !newPass) return alert('Заполните поля');
    try {
      await api.post('/auth/change-password', { oldPassword: oldPass, newPassword: newPass });
      setMessage('Пароль изменён');
      setOldPass('');
      setNewPass('');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      alert(err.response?.data?.message || 'Ошибка');
    }
  };

  const cancelEnrollment = async (id, className) => {
    if (window.confirm(`Отменить запись на "${className}"?`)) {
      try {
        await api.delete(`/classes/enrollment/${id}`);
        fetchEnrollments();
      } catch (err) {
        alert('Ошибка отмены');
      }
    }
  };

  // Обработчик клика по кастомной кнопке
  const triggerFileInput = () => {
    document.getElementById('avatar-input').click();
  };

  return (
    <div className="profile-container fade-in">
      <h2 className="text-center">Личный кабинет</h2>
      {message && <div className="success-message">{message}</div>}
      <div className="profile-card">
        <div className="avatar-section">
          {profile.avatar ? <img src={`http://localhost:5000${profile.avatar}`} alt="avatar" /> : <div className="no-avatar">📷</div>}
          <input type="file" id="avatar-input" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
          <button type="button" className="avatar-btn" onClick={triggerFileInput}>Загрузить фото</button>
        </div>
        <div className="info-section">
          <p><strong>Имя:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Роль:</strong> {user?.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
        </div>
      </div>

      <div className="change-password">
        <h3>Смена пароля</h3>
        <input type="password" placeholder="Старый пароль" value={oldPass} onChange={e => setOldPass(e.target.value)} />
        <input type="password" placeholder="Новый пароль" value={newPass} onChange={e => setNewPass(e.target.value)} />
        <button onClick={changePassword}>Сменить пароль</button>
      </div>

      <div className="my-classes">
        <h3>Мои записи на занятия</h3>
        {enrollments.length === 0 && <p>Вы ещё не записаны ни на одно занятие.</p>}
        <ul>
          {enrollments.map(e => (
            <li key={e.id}>
              <span className="class-info">
                {e.Class ? (
                  <><strong>{e.Class.title}</strong> — {e.Class.schedule} (тренер: {e.Class.instructor})</>
                ) : (
                  `Занятие ID: ${e.classId} (данные не загружены)`
                )}
              </span>
              <button onClick={() => cancelEnrollment(e.id, e.Class?.title || 'занятие')}>Отменить</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={logout} className="logout-btn">Выйти из аккаунта</button>
    </div>
  );
};

export default Profile;