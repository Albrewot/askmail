/**
 * Creating new GoogleStrategy instance
 * @param {object} GoogleStrategy
 */

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

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
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          //User is Already Registered
          done(null, existingUser);
        } else {
          new User({
            googleID: profile.id,
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            googleAccessToken: accessToken,
            googleRefreshToken: refreshToken,
          })
            .save()
            .then(user => done(null, user));
        }
      });
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
