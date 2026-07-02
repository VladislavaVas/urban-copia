const { Class, DanceStyle } = require('../models');

exports.createClass = async (req, res) => {
  const { title, description, style_id, instructor, schedule, maxSeats, image_url } = req.body;
  const newClass = await Class.create({ title, description, style_id, instructor, schedule, maxSeats, image_url });
  res.status(201).json(newClass);
};

exports.updateClass = async (req, res) => {
  const id = req.params.id;
  const { title, description, style_id, instructor, schedule, maxSeats, image_url } = req.body;
  await Class.update({ title, description, style_id, instructor, schedule, maxSeats, image_url }, { where: { id } });
  res.json({ message: 'Класс обновлён' });
};

exports.deleteClass = async (req, res) => {
  const id = req.params.id;
  await Class.destroy({ where: { id } });
  res.json({ message: 'Класс удалён' });
};