var models = require("../models");
const sequelize = require("sequelize");

exports.getAuthor = function (req, res) {
  var Authors = models.authors;
  const Authorid = req.params.idAuthor;
  Authors.findOne({ where: { idAuthor: Authorid } }).then((Authors) => {
    var newOfBirth = new Date(Authors.dateOfBirth);
    var newOfDeath = new Date(Authors.dateOfDeath);
    var dateOfBirth = "" + newOfBirth.toLocaleDateString();
    var dateOfDeath = "" + newOfDeath.toLocaleDateString();
    res.render("author.hbs", {
      Authors: Authors,
      User: req.user,
      dateOfBirth: dateOfBirth,
      dateOfDeath: dateOfDeath,
    });
  });
};
//Для добавления книги
exports.getCreateAuthor = function (req, res) {
  res.render("createAuthor.hbs");
};
exports.postCreateAuthor = function (req, res) {
  var User = parseInt(req.user.idUser);
  var Authors = models.authors;
  Authors.count({
    where: {
      lastName: req.body.lastName,
      name: req.body.name,
      patronymic: req.body.patronymic,
      dateOfBirth: req.body.dateOfBirth,
    },
  }).then((count) => {
    if (count == 0) {
      //таких нет
      Authors.create({
        lastName: req.body.lastName,
        name: req.body.name,
        patronymic: req.body.patronymic,
        dateOfBirth: req.body.dateOfBirth,
        dateOfDeath: req.body.dateOfDeath,
        biography: req.body.biography,
        added: false,
        idUser: User,
      })
        .then((Author) => {
          var json = {
            Author: Author,
            message: "Данные добавлены  базу",
          };
          res.json(json);
        })
        .catch((err) => console.log(err));
    } else {
      //уже есть
      var json = {
        message: "Такие данные уже есть. Данные не добавлены в базу",
      };
      res.json(json);
    }
  });
};
exports.getEditAuthor = function (req, res) {
  var Authors = models.authors;
  const id = req.params.id;
  Authors.findOne({ where: { idAuthor: id } }).then((author) => {
    res.render("createAuthorAdmin.hbs", {
      Author: author,
    });
  });
};
exports.getCreateAuthorAdmin = function (req, res) {
  res.render("createAuthorAdmin.hbs");
};
exports.postCreateAuthorAdmin = function (req, res) {
  var User = parseInt(req.user.idUser);
  const id = req.params.id;

  var Authors = models.authors;
  Authors.count({
    where: {
      lastName: req.body.lastName,
      name: req.body.name,
      patronymic: req.body.patronymic,
      dateOfBirth: req.body.dateOfBirth,
    },
  }).then((count) => {
    if (count == 0) {
      //таких нет
      if (id) {
        //изменение
        var path = null;
        if (req.files) {
          path = "" + req.files[0].filename;
        }
        Authors.update(
          {
            lastName: req.body.lastName,
            name: req.body.name,
            patronymic: req.body.patronymic,
            dateOfBirth: req.body.dateOfBirth,
            dateOfDeath: req.body.dateOfDeath,
            biography: req.body.biography,
            added: true,
            photo: path,
          },
          { where: { idAuthor: id } }
        )
          .then(() => {
            res.send("Данные добавлены  базу");
          })
          .catch((err) => console.log(err));
      } else {
        //создание
        var path = null;
        if (req.files) {
          path = "" + req.files[0].filename;
        }
        Authors.create({
          lastName: req.body.lastName,
          name: req.body.name,
          patronymic: req.body.patronymic,
          dateOfBirth: req.body.dateOfBirth,
          dateOfDeath: req.body.dateOfDeath,
          biography: req.body.biography,
          added: true,
          idUser: User,
          photo: path,
        })
          .then(() => {
            res.send("Данные добавлены  базу");
          })
          .catch((err) => console.log(err));
      }
    } else {
      //уже есть
      res.send("Такие данные уже есть. Данные не добавлены в базу");
    }
  });
};
