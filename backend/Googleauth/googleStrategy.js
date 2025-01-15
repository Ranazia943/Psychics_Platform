import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Psychics from "../models/psychics.model.js";
import generatePsychicTokenAndSetCookie from "../utils/psyToken.js";
import dotenv from 'dotenv';
dotenv.config();  // This loads the .env file


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback", // This should match the Google Cloud Console
    },
    async (accessToken, refreshToken, profile, done) => {
      const { sub: googleId, email, name: username } = profile._json;

      try {
        let psychic = await Psychics.findOne({ email });
        if (!psychic) {
          psychic = new Psychics({
            email,
            username,
            googleId,
            profilePic: profile.photos[0].value,
          });
          await psychic.save();
        }

        // Generate token and set cookie
        generatePsychicTokenAndSetCookie(psychic._id, done);
        done(null, psychic);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
 export default passport;