const router = require('express').Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.use(auth, role('admin'));
router.post('/classes', adminController.createClass);
router.put('/classes/:id', adminController.updateClass);
router.delete('/classes/:id', adminController.deleteClass);

module.exports = router;