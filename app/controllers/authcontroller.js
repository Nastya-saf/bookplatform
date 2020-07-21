//авторизация
var exports = (module.exports = {});
const sequelize = require("sequelize");

exports.signup = function (req, res) {
  req.session.returnTo = req.url;
  req.session.returnTo = "/";
  res.render("signup");
};
exports.signin = function (req, res) {
  req.session.returnTo = req.url;
  req.session.returnTo = "/";
  res.render("signin");
};
exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
};
