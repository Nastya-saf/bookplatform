var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv").config({ path: ".env" });
var exphbs = require("express-handlebars");
const multer = require("multer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("views", "./app/views");

const hbs = exphbs.create({
  helpers: {
    select: function (selected, options) {
      return options
        .fn(this)
        .replace(
          new RegExp(' value="' + selected + '"'),
          '$& selected="selected"'
        )
        .replace(
          new RegExp(">" + selected + "</option>"),
          ' selected="selected"$&'
        );
    },
  },
  layoutsDir: "./app/views/layouts",
  defaultLayout: "layout",
  partialsDir: "./app/views/partials",
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);

app.set("view engine", ".hbs");

const jsonParser = express.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + "/uploads"));
app.use(express.static(__dirname + "/css"));
var models = require("./app/models");

var authRoute = require("./app/routes/auth.js")(app, passport);
require("./app/config/passport/passport.js")(passport, models.users);
const homeRouter = require("./app/routes/homeRouter.js");
const bookRouter = require("./app/routes/bookRouter.js");
const adminRouter = require("./app/routes/adminRouter.js");
const userRouter = require("./app/routes/userRouter.js");
const authorRouter = require("./app/routes/authorRouter.js");
app.use("/author", authorRouter);
app.use("/book", bookRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/", homeRouter);

models.sequelize
  .sync()
  .then(function () {
    console.log("Nice! Database looks fine");
  })
  .catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

app.listen(5000, function (err) {
  if (!err) console.log("Site is live");
  else console.log(err);
});
