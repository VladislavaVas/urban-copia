const router = require('express').Router();
const classController = require('../controllers/classController');
const auth = require('../middleware/auth');

// Все маршруты
router.get('/', classController.getClasses);
router.get('/my-enrollments', auth, classController.getMyEnrollments);
router.post('/:id/enroll', auth, classController.enroll);
router.delete('/enrollment/:id', auth, classController.cancelEnrollment);

module.exports = router;