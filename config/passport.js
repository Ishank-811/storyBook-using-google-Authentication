var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const mongoose = require("mongoose");
const User = require("../models/user");
module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "686063206026-sjtd6cr7cc7cvkdvipkfj75rkp5q9fvt.apps.googleusercontent.com",
        clientSecret: "0crhGRes4P5aD64CkPajP8fx",
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          GoogleId: profile.id,
          displayName: profile.displayName,
          FirstName: profile.name.givenName,
          LastName: profile.name.familyName,
          Image: profile.photos[0].value,
        };
        try {
          let users = await User.findOne({ GoogleId: profile.id });
          if (users) {
            done(null, users);
          } else {
            users = await User.create(newUser);
            done(null, users);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
};
