import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Admin = () => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', instructor: '', schedule: '', maxSeats: 10, style_id: 1, image_url: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchClasses = async () => {
    const res = await api.get('/classes?limit=100');
    setClasses(res.data.classes);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitClass = async () => {
    try {
      if (editingId) {
        await api.put(`/admin/classes/${editingId}`, form);
      } else {
        await api.post('/admin/classes', form);
      }
      fetchClasses();
      setForm({ title: '', description: '', instructor: '', schedule: '', maxSeats: 10, style_id: 1, image_url: '' });
      setEditingId(null);
      alert(editingId ? 'Занятие обновлено!' : 'Занятие создано!');
    } catch (err) {
      alert('Ошибка: ' + (err.response?.data?.message || 'Что-то пошло не так'));
    }
  };

  const editClass = (c) => {
    setForm(c);
    setEditingId(c.id);
  };

  const deleteClass = async (id) => {
    if (window.confirm('Удалить это занятие?')) {
      await api.delete(`/admin/classes/${id}`);
      fetchClasses();
    }
  };

  return (
    <div className="admin-panel fade-in">
      <h1 className="text-center mb-5">Администрирование студии</h1>
      <div className="admin-form">
        <h3>{editingId ? 'Редактировать занятие' : 'Создать новое занятие'}</h3>
        <input name="title" placeholder="Название занятия" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Описание" value={form.description} onChange={handleChange} rows="3" />
        <input name="instructor" placeholder="Тренер" value={form.instructor} onChange={handleChange} />
        <input name="schedule" placeholder="Расписание (напр. Пн/Ср 18:00)" value={form.schedule} onChange={handleChange} />
        <input name="maxSeats" type="number" placeholder="Макс. мест" value={form.maxSeats} onChange={handleChange} />
        <select name="style_id" value={form.style_id} onChange={handleChange}>
          <option value="1">Hip-Hop</option>
          <option value="2">Contemporary</option>
          <option value="3">Jazz-Funk</option>
          <option value="4">Breaking</option>
        </select>
        {/* НОВОЕ ПОЛЕ ДЛЯ ССЫЛКИ НА КАРТИНКУ */}
        <input name="image_url" placeholder="Ссылка на картинку (URL)" value={form.image_url} onChange={handleChange} />
        <div className="admin-buttons">
          <button onClick={submitClass}>{editingId ? 'Обновить' : 'Создать'}</button>
          {editingId && <button onClick={() => { setEditingId(null); setForm({ title: '', description: '', instructor: '', schedule: '', maxSeats: 10, style_id: 1, image_url: '' }); }}>Отмена</button>}
        </div>
      </div>

      <h3>Список занятий</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Тренер</th>
            <th>Расписание</th>
            <th>Мест</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {classes.map(c => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.instructor}</td>
              <td>{c.schedule}</td>
              <td>{c.maxSeats}</td>
              <td>
                <button className="edit-btn" onClick={() => editClass(c)}>✏️</button>
                <button className="delete-btn" onClick={() => deleteClass(c.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;