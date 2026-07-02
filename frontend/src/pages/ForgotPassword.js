import React, { useState } from 'react';
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await api.post('/auth/forgot-password', { email });
      setMessage('Инструкция по восстановлению отправлена на вашу почту.');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка');
    }
  };

  return (
    <div className="auth-container">
      <h2>Восстановление пароля</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Отправить</button>
      </form>
      <p><a href="/login">Вернуться ко входу</a></p>
    </div>
  );
};

export default ForgotPassword;