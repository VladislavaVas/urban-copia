import React, { useState } from 'react';
import api from '../services/api';

const Schedule = () => {
  const [form, setForm] = useState({ name: '', phone: '', direction: '', level: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return alert('Заполните имя и телефон');
    try {
      await api.post('/trial', form);
      alert('Заявка отправлена! Мы свяжемся с вами.');
      setForm({ name: '', phone: '', direction: '', level: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      alert('Ошибка. Попробуйте позже.');
    }
  };

  return (
    <div className="fade-in">
      <h1 className="text-center mb-5">Расписание занятий</h1>
      <div className="alert">⚠️ Расписание может меняться. Уточняйте у администратора.</div>
      <div className="schedule-table-container">
        <table className="schedule-table">
          <thead><tr><th>Время</th><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th></tr></thead>
          <tbody>
            <tr><td>10:00-11:00</td><td>-</td><td>-</td><td>Йога для танцоров</td><td>-</td><td>-</td><td>Бальные танцы</td></tr>
            <tr><td>11:00-12:00</td><td>-</td><td>-</td><td>Йога для танцоров</td><td>-</td><td>-</td><td>Бальные танцы</td></tr>
            <tr><td>17:00-18:00</td><td>Хип-Хоп дети</td><td>Контемпорари нач.</td><td>Хип-Хоп дети</td><td>Контемпорари нач.</td><td>Хип-Хоп дети</td><td>-</td></tr>
            <tr><td>18:00-19:00</td><td>Дэнсхолл</td><td>Сальса</td><td>Дэнсхолл</td><td>Сальса</td><td>Джаз-фанк</td><td>-</td></tr>
            <tr><td>19:00-20:00</td><td>Хип-Хоп продв.</td><td>Контемпорари продв.</td><td>Хип-Хоп продв.</td><td>Контемпорари продв.</td><td>Бачата</td><td>-</td></tr>
            <tr><td>20:00-21:00</td><td>Хип-Хоп нач.</td><td>Бальные танцы</td><td>Хип-Хоп нач.</td><td>Бальные танцы</td><td>Сальса</td><td>-</td></tr>
          </tbody>
        </table>
      </div>
      <div className="price-info">
        <div className="price-card"><h3>Абонементы</h3><ul><li>Разовое - 500₽</li><li>4 занятия - 1800₽</li><li>8 занятий - 3200₽</li><li>12 занятий - 4200₽</li><li>Безлимит - 6000₽</li></ul></div>
        <div className="price-card"><h3>Примечания</h3><ul><li>Пробное - 300₽</li><li>Предварительная запись обязательна</li><li>Абонемент действует 30 дней</li><li>Заморозка на 7 дней</li></ul></div>
      </div>
      <div className="trial-form">
        <h3>Записаться на пробный урок</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Ваше имя *" value={form.name} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Телефон *" value={form.phone} onChange={handleChange} required />
          <select name="direction" value={form.direction} onChange={handleChange}><option value="">Направление</option><option>Хип-Хоп</option><option>Контемпорари</option><option>Дэнсхолл</option><option>Сальса</option></select>
          <select name="level" value={form.level} onChange={handleChange}><option value="">Уровень</option><option>Начинающий</option><option>Продолжающий</option><option>Продвинутый</option></select>
          <textarea name="message" placeholder="Доп. информация" rows="3" value={form.message} onChange={handleChange}></textarea>
          <button type="submit">Отправить заявку</button>
          {submitted && <div className="success-message">Заявка отправлена!</div>}
        </form>
      </div>
    </div>
  );
};
export default Schedule;