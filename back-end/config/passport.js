const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Op } = require('sequelize'); // Aquí importamos `Op` de Sequelize
const User = require('../models/User'); // Importamos el modelo User

// Serializar el usuario en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id); // guardamos el _id de MongoDB
});

// Deserializar el usuario desde la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);  // Cambié `findById` por `findByPk`
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Estrategia de Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      console.log('Email recibido de Google:', email);  // Verifica que el email se recibe correctamente

      let existingUser = await User.findOne({
        where: {
          [Op.or]: [  // Usamos el operador `Op.or` de Sequelize
            { googleId: profile.id },  // Busca por googleId
            { email: email }  // O por email
          ]
        }
      });

      if (existingUser) {
        // Si el usuario ya existe, lo devolvemos
        if (!existingUser.googleId) {
          existingUser.googleId = profile.id;  // Asocia el googleId si aún no lo tiene
          await existingUser.save();
        }
        return done(null, existingUser);  // Devuelve el usuario existente
      }

      // Si el usuario no existe, lo creamos
      const newUser = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: email,
        photo: profile.photos?.[0]?.value
      });

      done(null, newUser);  // Devuelve el nuevo usuario
    } catch (error) {
      done(error, null);
    }
  }
));
