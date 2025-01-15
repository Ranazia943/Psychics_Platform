import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js'; // Adjust the import path

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback', // Must match your Google Developer Console settings
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if user already exists in our db
      const existingUser = await User.findOne({ email: profile.emails[0].value });

      if (existingUser) {
        return done(null, existingUser);
      }

      // If not, create a new user in our db
      const newUser = await new User({
        email: profile.emails[0].value,
        username: profile.displayName,
        password: null, // Password is not needed for Google sign-up
        gender: profile.gender || 'male', // If available
      }).save();

      done(null, newUser);
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
