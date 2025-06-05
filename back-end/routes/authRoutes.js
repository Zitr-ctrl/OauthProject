const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Registro y login normales
router.post('/register', register);
router.post('/login', login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Generar token JWT para el usuario autenticado
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Redirigir al frontend con el token como parámetro
    res.redirect(`http://localhost:5173/google-success?token=${token}`);
  }
);

module.exports = router;
