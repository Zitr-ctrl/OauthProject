const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

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
        // Si el usuario existe pero no tiene googleId, lo asociamos
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
        photo: profile.photos?.[0]?.value // Opcional: guardar la foto
      });

      await newUser.save();
      done(null, newUser);

    } catch (error) {
      done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
