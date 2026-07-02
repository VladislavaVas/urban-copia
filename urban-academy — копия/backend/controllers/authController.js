const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');
const sendEmail = require('../utils/email');
require('dotenv').config();

// Регистрация – без подтверждения почты, сразу активный пользователь
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email уже используется' });

    const hashed = await bcrypt.hash(password, 10);
    
    const isAdmin = (process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL);
    
    const user = await User.create({
      email,
      password: hashed,
      name,
      isVerified: true,
      verificationToken: null,
      role: isAdmin ? 'admin' : 'user'
    });

    // ОТПРАВКА ПИСЬМА ПРИ РЕГИСТРАЦИИ
    await sendEmail(email, 'Добро пожаловать в танцевальную студию!', `
      <h2>Здравствуйте, ${name}!</h2>
      <p>Вы успешно зарегистрировались на нашем сайте.</p>
      <p>Теперь вы можете войти и записываться на занятия.</p>
      <p>С уважением,<br>Команда танцевальной студии</p>
    `);

    res.status(201).json({ message: 'Регистрация успешна. Теперь вы можете войти.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Этот метод можно удалить или оставить – он больше не используется
exports.verifyEmail = async (req, res) => {
  res.status(400).json({ message: 'Подтверждение email не требуется' });
};

// Вход – без проверки isVerified
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Неверные данные' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Неверные данные' });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
};

// Восстановление пароля – письмо остаётся
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  await sendEmail(email, 'Восстановление пароля', `<a href="${resetUrl}">Сбросить пароль</a>`);
  res.json({ message: 'Инструкция отправлена на почту' });
};

// Сброс пароля – письмо остаётся
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({ where: { resetToken: token } });
  if (!user) return res.status(400).json({ message: 'Неверный токен' });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = null;
  await user.save();

  await sendEmail(user.email, 'Пароль изменён', 'Ваш пароль был успешно изменён.');
  res.json({ message: 'Пароль обновлён' });
};

// Смена пароля (когда пользователь уже авторизован) – письмо остаётся
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);
  const valid = await bcrypt.compare(oldPassword, user.password);
  if (!valid) return res.status(401).json({ message: 'Старый пароль неверен' });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  await sendEmail(user.email, 'Пароль изменён', 'Ваш пароль был изменён.');
  res.json({ message: 'Пароль обновлён' });
};