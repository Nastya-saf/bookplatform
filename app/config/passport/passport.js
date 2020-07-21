var bCrypt = require("bcrypt-nodejs");
const { Op } = require("sequelize");
module.exports = function (passport, users) {
  var Users = users;
  var LocalStrategy = require("passport-local").Strategy;
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        var generateHash = function (password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        Users.findOne({
          where: {
            [Op.or]: [{ email: email }, { nickname: req.body.nickname }],
          },
        }).then(function (users) {
          if (users) {
            return done(null, false, {
              message: "That email is already taken",
            });
          } else {
            var userPassword = generateHash(password);
            var data = {
              email: email,
              password: userPassword,
              nickname: req.body.nickname,
              avatar: req.body.avatar,
              monthlyFee: 0,
            };
            Users.create(data).then(function (newUser, created) {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
  passport.serializeUser(function (users, done) {
    done(null, users.idUser);
  });
  passport.deserializeUser(function (id, done) {
    Users.findOne({ where: { idUser: id } }).then(function (users) {
      if (users) {
        done(null, users.get());
      } else {
        done(users.errors, null);
      }
    });
  });
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        var Users = users;
        var isValidPassword = function (userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };
        Users.findOne({
          where: {
            email: email,
          },
        })
          .then(function (users) {
            if (!users) {
              return done(null, false, {
                message: "Email does not exist",
              });
            }
            if (!isValidPassword(users.password, password)) {
              return done(null, false, {
                message: "Incorrect password.",
              });
            }
            var userinfo = users.get();
            return done(null, userinfo);
          })
          .catch(function (err) {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Signin",
            });
          });
      }
    )
  );
};
