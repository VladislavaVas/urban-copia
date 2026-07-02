const { User } = require('../models');

exports.getProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { name } = req.body;
  await User.update({ name }, { where: { id: req.user.id } });
  res.json({ message: 'Профиль обновлён' });
};

exports.uploadAvatar = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Файл не загружен' });
  const avatarUrl = `/uploads/${req.file.filename}`;
  await User.update({ avatar: avatarUrl }, { where: { id: req.user.id } });
  res.json({ avatar: avatarUrl });
};