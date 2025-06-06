const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Registro y login normales
router.post('/register', register);
router.post('/login', login);

// Login con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:5173/google-success?token=${token}`);
  }
);

// Obtener usuario autenticado (requiere token)
router.get('/user', authMiddleware, (req, res) => {
  res.json(req.user);
});


module.exports = router;
