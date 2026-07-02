const router = require('express').Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/register', authController.register);
router.get('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/change-password', require('../middleware/auth'), authController.changePassword);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user.id, email: req.user.email, role: req.user.role }, process.env.JWT_SECRET);
  res.redirect(`${process.env.FRONTEND_URL}/oauth-redirect?token=${token}`);
});

module.exports = router;