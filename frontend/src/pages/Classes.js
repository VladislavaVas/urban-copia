import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Заглушка, если у занятия нет своей картинки
  const defaultImg = 'https://via.placeholder.com/400x200?text=Нет+фото';

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get(`/classes?page=${page}&limit=6`);
        setClasses(res.data.classes);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, [page]);

  const enroll = async (id, title) => {
    try {
      await api.post(`/classes/${id}/enroll`);
      alert(`✅ Вы записаны на "${title}"!`);
    } catch (err) {
      alert(err.response?.data?.message || 'Ошибка записи');
    }
  };

  if (loading) return <div className="loading">💃 Загрузка занятий...</div>;
  if (classes.length === 0) return <div className="loading">Нет занятий. Добавьте через админку.</div>;

  return (
    <div className="fade-in">
      <h1 className="text-center mb-5">Занятия</h1>
      <div className="class-grid">
        {classes.map(c => {
          // Берём картинку из поля image_url, если нет – заглушка
          const imgUrl = c.image_url || defaultImg;
          return (
            <div className="card" key={c.id}>
              <div className="card-img" style={{ backgroundImage: `url(${imgUrl})` }}></div>
              <div className="card-content">
                <h3>{c.title}</h3>
                <p><strong> Тренер:</strong> {c.instructor}</p>
                <p><strong>Расписание:</strong> {c.schedule}</p>
                <p><strong> Мест:</strong> {c.maxSeats}</p>
                <button onClick={() => enroll(c.id, c.title)}> Записаться</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i+1)} className={page === i+1 ? 'active' : ''}>
            {i+1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Classes;