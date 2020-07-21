const express = require("express");
var authController = require("../controllers/authcontroller.js");
const authRouter = express.Router();

module.exports = function (app, passport) {
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successReturnToOrRedirect: "/",
      failureRedirect: "/signup",
    })
  );
  app.get("/logout", authController.logout);
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successReturnToOrRedirect: "/book",
      failureRedirect: "/signin",
    })
  );
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};
