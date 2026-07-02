require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./utils/passport');
const { sequelize } = require('./models');
const sendEmail = require('./utils/email'); // импорт функции отправки писем

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const classRoutes = require('./routes/classes');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/admin', adminRoutes);

// ===== НОВЫЕ МАРШРУТЫ ДЛЯ ФОРМ =====
// Отправка сообщения с формы контактов
app.post('/api/contact', async (req, res) => {
  const { name, phone, email, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }
  try {
    await sendEmail(
      'vladislava.vasileva.2007@mail.ru', // замените на ваш email, куда будут приходить сообщения
      `Сообщение от ${name}`,
      `<p>Имя: ${name}</p>
       <p>Телефон: ${phone}</p>
       <p>Email: ${email || 'не указан'}</p>
       <p>Сообщение: ${message || ''}</p>`
    );
    res.json({ message: 'Сообщение отправлено' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка отправки сообщения' });
  }
});

// Запись на пробный урок
app.post('/api/trial', async (req, res) => {
  const { name, phone, direction, level, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }
  try {
    await sendEmail(
      'info@urbanacademy.ru',
      `Пробный урок от ${name}`,
      `<p>Имя: ${name}</p>
       <p>Телефон: ${phone}</p>
       <p>Направление: ${direction || 'не выбрано'}</p>
       <p>Уровень: ${level || 'не выбран'}</p>
       <p>Комментарий: ${message || ''}</p>`
    );
    res.json({ message: 'Заявка принята' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка отправки заявки' });
  }
});
// ===== КОНЕЦ НОВЫХ МАРШРУТОВ =====

const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
});

module.exports = app;