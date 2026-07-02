import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', text: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(stored);
  }, []);

  const addReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    const updated = [{ name: newReview.name, text: newReview.text, date: new Date().toISOString() }, ...reviews];
    localStorage.setItem('reviews', JSON.stringify(updated));
    setReviews(updated);
    setNewReview({ name: '', text: '' });
  };

  return (
    <div className="fade-in">
      <div className="hero">
        <div className="hero-content">
          <h1>Раскрой свой ритм!</h1>
          <p>Профессиональная танцевальная студия для взрослых и детей</p>
          <Link to="/schedule" className="hero-btn">Записаться на пробный урок</Link>
        </div>
      </div>

      <section className="advantages-section">
        <h2>Почему выбирают нас</h2>
        <div className="advantages-grid">
          <div className="advantage-item">
            <i className="bi bi-person-check"></i>
            <h3>Опытные преподаватели</h3>
            <p>Профессионалы с многолетним опытом</p>
          </div>
          <div className="advantage-item">
            <i className="bi bi-clock"></i>
            <h3>Удобное расписание</h3>
            <p>Занятия утром, днем и вечером</p>
          </div>
          <div className="advantage-item">
            <i className="bi bi-heart"></i>
            <h3>Дружеская атмосфера</h3>
            <p>Уютная студия, где каждый найдет друзей</p>
          </div>
        </div>
      </section>

      <section className="popular-section">
        <h2 className="text-center">Популярные направления</h2>
        <div className="popular-grid">
          <div className="popular-card">
            <img src="https://i.pinimg.com/736x/96/fb/82/96fb82c024a9fdccc6b40101bf119066.jpg" alt="hiphop" />
            <h3>Хип-Хоп</h3>
            <Link to="/schedule" className="btn-outline">Подробнее</Link>
          </div>
          <div className="popular-card">
            <img src="https://avatars.mds.yandex.net/i?id=70d60afe0df89c25a59566ee3bb5c80a_l-5874989-images-thumbs&n=13" alt="contemporary" />
            <h3>Контемпорари</h3>
            <Link to="/schedule" className="btn-outline">Подробнее</Link>
          </div>
          <div className="popular-card">
            <img src="https://storage.yandexcloud.net/slenergy.ru/uploads/common/2018/05/10/img_5224.jpg" alt="dancehall" />
            <h3>Дэнсхолл</h3>
            <Link to="/schedule" className="btn-outline">Подробнее</Link>
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <h2 className="text-center">Отзывы наших учеников</h2>
        <div className="reviews-list">
          {reviews.length === 0 && <p>Пока нет отзывов. Будьте первым!</p>}
          {reviews.map((r, idx) => (
            <div key={idx} className="review-card">
              <h4>{r.name}</h4>
              <p>{r.text}</p>
              <small>{new Date(r.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
        <div className="add-review">
          <h3>Добавить свой отзыв</h3>
          <form onSubmit={addReview}>
            <input type="text" placeholder="Ваше имя *" value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} required />
            <textarea placeholder="Ваш отзыв *" rows="3" value={newReview.text} onChange={e => setNewReview({...newReview, text: e.target.value})} required></textarea>
            <button type="submit">Отправить отзыв</button>
          </form>
        </div>
      </section>

      <section className="faq-section">
        <h2>Частые вопросы</h2>
        <div className="accordion">
          <details><summary>Нужна ли специальная подготовка?</summary><p>Нет, мы принимаем учеников с любым уровнем подготовки.</p></details>
          <details><summary>Что нужно брать с собой на занятие?</summary><p>Удобную спортивную одежду и сменную обувь.</p></details>
          <details><summary>Можно ли посетить пробное занятие?</summary><p>Да, первое пробное занятие стоит всего 300 рублей.</p></details>
        </div>
      </section>
    </div>
  );
};
export default Home;