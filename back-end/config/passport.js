const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Serializar el usuario en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id); // guardamos el _id de MongoDB
});

// Deserializar el usuario desde la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Estrategia de Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;

      // Buscar por googleId o email
      let existingUser = await User.findOne({
        $or: [
          { googleId: profile.id },
          { email: email }
        ]
      });

      if (existingUser) {
        // Asociar googleId si no está guardado
        if (!existingUser.googleId) {
          existingUser.googleId = profile.id;
          await existingUser.save();
        }
        return done(null, existingUser);
      }

      // Crear nuevo usuario
      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: email,
        photo: profile.photos?.[0]?.value
      });

      await newUser.save();
      done(null, newUser);

    } catch (error) {
      done(error, null);
    }
  }
));
