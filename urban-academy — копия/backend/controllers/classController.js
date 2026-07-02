const { Class, DanceStyle, Enrollment, User } = require('../models');

// Получение всех занятий с пагинацией
exports.getClasses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { count, rows } = await Class.findAndCountAll({
      include: [{ model: DanceStyle, as: 'style' }],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      classes: rows
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Запись на занятие
exports.enroll = async (req, res) => {
  try {
    const classId = req.params.id;
    const userId = req.user.id;

    const existing = await Enrollment.findOne({ where: { userId, classId } });
    if (existing) return res.status(400).json({ message: 'Вы уже записаны' });

    const danceClass = await Class.findByPk(classId);
    if (!danceClass) return res.status(404).json({ message: 'Занятие не найдено' });

    const enrolledCount = await Enrollment.count({ where: { classId } });
    if (enrolledCount >= danceClass.maxSeats) {
      return res.status(400).json({ message: 'Нет свободных мест' });
    }

    await Enrollment.create({ userId, classId });
    res.json({ message: 'Вы записаны на занятие' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Получение записей пользователя (ИСПРАВЛЕННЫЙ)
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Class,
        required: true,
        attributes: ['id', 'title', 'instructor', 'schedule', 'maxSeats']
      }]
    });

    // Форматируем ответ
    const formatted = enrollments.map(e => ({
      id: e.id,
      classId: e.classId,
      enrolled_at: e.createdAt,
      Class: e.Class ? {
        id: e.Class.id,
        title: e.Class.title,
        instructor: e.Class.instructor,
        schedule: e.Class.schedule,
        maxSeats: e.Class.maxSeats
      } : null
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Ошибка getMyEnrollments:', err);
    res.status(500).json({ message: err.message });
  }
};

// Отмена записи
exports.cancelEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findOne({
      where: { id: enrollmentId, userId: req.user.id }
    });
    if (!enrollment) return res.status(404).json({ message: 'Запись не найдена' });
    await enrollment.destroy();
    res.json({ message: 'Запись отменена' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};