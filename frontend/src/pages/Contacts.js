import React, { useState } from 'react';
import api from '../services/api';

const Contacts = () => {
  const [feedback, setFeedback] = useState({ name: '', phone: '', email: '', message: '', agreement: false });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFeedback({ ...feedback, [e.target.name]: val });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.name || !feedback.phone || !feedback.agreement) return alert('Заполните имя, телефон и согласие');
    try {
      await api.post('/contact', feedback);
      alert('Сообщение отправлено!');
      setFeedback({ name: '', phone: '', email: '', message: '', agreement: false });
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      alert('Ошибка отправки');
    }
  };

  return (
    <div className="fade-in">
      <h1 className="text-center mb-5">Контакты</h1>
      <div className="contacts-wrapper">
        <div className="contacts-left">
          <h3 className="contacts-title text-center">Контактная информация</h3>
          <div className="contacts-info">
            <div className="info-card"><i className="bi bi-geo-alt-fill"></i><div><strong>Адрес:</strong> г. Владимир, ул. Большая Нижегородская, д. 77</div></div>
            <div className="info-card"><i className="bi bi-telephone-fill"></i><div><strong>Телефон:</strong> <a href="tel:+74922555555">+7 (4922) 55-55-55</a></div></div>
            <div className="info-card"><i className="bi bi-envelope-fill"></i><div><strong>Email:</strong> <a href="mailto:info@urbanacademy.ru">info@urbanacademy.ru</a></div></div>
            <div className="info-card"><i className="bi bi-clock-fill"></i><div><strong>Время работы:</strong> Пн-Пт: 10:00-22:00, Сб: 10:00-20:00, Вс: 12:00-18:00</div></div>
            <div className="social-links"><h4>Мы в соцсетях:</h4><a href="https://vk.com/urban_academ" target="_blank" rel="noreferrer">VK</a><a href="https://t.me/urban_academ" target="_blank" rel="noreferrer">Telegram</a></div>
          </div>
        </div>
        <div className="contacts-right">
          <h3 className="contacts-title text-center">Форма обратной связи</h3>
          <div className="contacts-form">
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Ваше имя *" value={feedback.name} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Ваш телефон *" value={feedback.phone} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Ваш email" value={feedback.email} onChange={handleChange} />
              <textarea name="message" placeholder="Сообщение" rows="4" value={feedback.message} onChange={handleChange}></textarea>
              <label className="checkbox-label"><input type="checkbox" name="agreement" checked={feedback.agreement} onChange={handleChange} /> Я согласен на обработку персональных данных *</label>
              <button type="submit">Отправить сообщение</button>
              {sent && <div className="success-message">Сообщение отправлено!</div>}
            </form>
          </div>
        </div>
      </div>
      <div className="map-container">
        <h3 className="text-center">Как нас найти</h3>
        <div className="map" onClick={() => window.open('https://yandex.ru/maps/?pt=40.442227,56.144939&z=17&l=map', '_blank')}>
          <iframe title="map" src="https://yandex.ru/map-widget/v1/?z=17&pt=40.442227,56.144939&l=map" allowFullScreen loading="lazy"></iframe>
          <div className="map-overlay">Урбанакадемия<br />ул. Большая Нижегородская, 77</div>
        </div>
      </div>
    </div>
  );
};
export default Contacts;