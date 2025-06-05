const express = require('express');
const passport = require('passport');
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
    // Aquí podrías generar un JWT también
    res.send("Autenticado con Google");
  });

module.exports = router;
