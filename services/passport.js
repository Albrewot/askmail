/**
 * Creating new GoogleStrategy instance
 * @param {object} GoogleStrategy
 */

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");

/**
 * @Passport Passport Usage Logic
 */

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access", accessToken);
      console.log("refresh", refreshToken);
      console.log("profile", profile);
      console.log("done", done);
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log("access", accessToken);
      console.log("refresh", refreshToken);
      console.log("profile", profile);
    },
  ),
);
