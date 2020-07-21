var models = require("../models");
const sequelize = require("sequelize");

exports.getAdmin = function (req, res) {
  var Users = models.users;

  Users.findOne({
    where: { idUser: parseInt(req.user.idUser) },
  }).then((User) => {
    res.render("admin.hbs", { User: User });
  });
};
exports.postAdmin = function (req, res) {
  const updateTop = req.body.updateTop;
  if (updateTop) {
    var Users = models.users;
    var Sellers = models.sellers;
    var Tops = models.top;
    Sellers.findAll({
      include: Users,
      order: [["numberOfSales", "DESC"]],
    }).then((sellers) => {
      Tops.findAll({}).then((tops) => {
        for (var i = 0; i < tops.length; i++) {
          Tops.destroy({ where: { idTop: tops[i].idTop } });
        }
      });
      for (var i = 0; i < sellers.length; i++) {
        Tops.create({
          idSeller: sellers[i].user.idUser,
          place: i + 1,
        });
      }
      res.send('<p><a href="/topSellers">Топ продавцов</a></p>');
    });
  }
};
exports.getState = function (req, res) {
  res.render("crete.hbs", {
    url: "State",
    heder: "Добавить состояние книги",
    textOne: "Состояние",
  });
};
exports.postState = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var States = models.states;
  const Createtitle = req.body.textOne;
  States.count({ where: { title: Createtitle } }).then((count) => {
    if (count == 0) {
      States.create({ title: Createtitle })
        .then(() => {
          res.send("Состояние добавлено с базу");
        })
        .catch((err) => console.log(err));
    } else {
      res.send("Такое состояние книги уже есть. Данные не добавлены в базу");
    }
  });
};

exports.getEditGenre = function (req, res) {
  const id = req.params.id;
  var Genres = models.genres;
  Genres.findOne({ where: { idGenre: id } }).then((genre) => {
    res.render("crete.hbs", {
      url: "Genre",
      heder: "Изменить жанр",
      textOne: "Жанр",
      id: genre.idGenre,
      title: genre.title,
    });
  });
};
exports.getGenre = function (req, res) {
  res.render("crete.hbs", {
    url: "Genre",
    heder: "Добавить жанр",
    textOne: "Жанр",
  });
};
exports.postGenre = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var iduser = parseInt(req.user.idUser);
  var Genres = models.genres;
  const Createrule = req.body.textOne;
  const id = req.body.id;

  Genres.count({ where: { title: Createrule } }).then((count) => {
    if (count == 0) {
      if (id) {
        Genres.update(
          { title: Createrule, added: true },
          { where: { idGenre: id } }
        )
          .then((genre) => {
            res.send("Данные добавлены  базу");
          })
          .catch((err) => console.log(err));
      } else {
        Genres.create({ title: Createrule, added: true, idUser: iduser })
          .then((genre) => {
            res.send("Данные добавлены  базу");
          })
          .catch((err) => console.log(err));
      }
    } else {
      var json = {
        message: "Такие данные уже есть. Данные не добавлены в базу",
      };
      res.send("Такие данные уже есть. Данные не добавлены в базу");
    }
  });
};
exports.getRegulation = function (req, res) {
  res.render("crete.hbs", {
    url: "Regulations",
    heder: "Добавить правило",
    textOne: "Заголовок",
    textTwo: "Описание",
  });
};
exports.postRegulation = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var Regulations = models.regulations;
  const Createhead = req.body.textOne;
  const Createrule = req.body.textTwo;

  Regulations.count({ where: { head: Createhead, rule: Createrule } }).then(
    (count) => {
      if (count == 0) {
        Regulations.create({ head: Createhead, rule: Createrule })
          .then(() => {
            res.send("Данные добавлены  базу");
          })
          .catch((err) => console.log(err));
      } else {
        res.send("Такие данные уже есть. Данные не добавлены в базу");
      }
    }
  );
};
exports.getGlossary = function (req, res) {
  res.render("crete.hbs", {
    url: "Glossary",
    heder: "Добавить термин",
    textOne: "термин",
    textTwo: "определение",
  });
};
exports.postGlossary = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var Glossary = models.glossary;
  const Createword = req.body.textOne;
  const Createdefinition = req.body.textTwo;

  Glossary.count({
    where: { word: Createword, definition: Createdefinition },
  }).then((count) => {
    if (count == 0) {
      Glossary.create({ word: Createword, definition: Createdefinition })
        .then(() => {
          res.send("Данные добавлены  базу");
        })
        .catch((err) => console.log(err));
    } else {
      res.send("Такие данные уже есть. Данные не добавлены в базу");
    }
  });
};
exports.getTypesOfBindings = function (req, res) {
  res.render("crete.hbs", {
    url: "TypesOfBinding",
    heder: "Добавить типа переплета",
    textOne: "Типа переплета",
  });
};
exports.postTypesOfBindings = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var TypesOfBindings = models.typesOfBindings;
  const Createtitle = req.body.textOne;

  TypesOfBindings.count({
    where: { title: Createtitle },
  }).then((count) => {
    if (count == 0) {
      TypesOfBindings.create({ title: Createtitle })
        .then(() => {
          res.send("Данные добавлены  базу");
        })
        .catch((err) => console.log(err));
    } else {
      res.send("Такие данные уже есть. Данные не добавлены в базу");
    }
  });
};
exports.getCreateDeliveryMethod = function (req, res) {
  res.render("crete.hbs", {
    url: "DeliveryMethod",
    heder: "Добавить способ доставки",
    textOne: "Способ доставки",
  });
};
exports.postCreateDeliveryMethod = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var DeliveryMethods = models.DeliveryMethods;
  const Createtitle = req.body.textOne;

  DeliveryMethods.count({
    where: { title: Createtitle },
  }).then((count) => {
    if (count == 0) {
      DeliveryMethods.create({
        title: Createtitle,
      })
        .then(() => {
          res.send("Данные добавлены  базу");
        })
        .catch((err) => console.log(err));
    } else {
      res.send("Такие данные уже есть. Данные не добавлены в базу");
    }
  });
};
exports.getEditPublisher = function (req, res) {
  const id = req.params.id;
  var Publishers = models.publishers;
  Publishers.findOne({ where: { idPublisher: id } }).then((publisher) => {
    res.render("crete.hbs", {
      url: "Publisher",
      heder: "Изменить издательство",
      textOne: "Издательство",
      id: publisher.idPublisher,
      title: publisher.title,
    });
  });
};
exports.getCreatePublisher = function (req, res) {
  res.render("crete.hbs", {
    url: "Publisher",
    heder: "Добавить издательство",
    textOne: "Издательство",
  });
};
exports.postCreatePublisher = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var Publishers = models.publishers;
  const Createtitle = req.body.textOne;
  const id = req.body.id;

  Publishers.count({
    where: { title: Createtitle },
  }).then((count) => {
    if (count == 0) {
      if (id) {
        Publishers.update(
          { title: Createtitle, added: true },
          { where: { idPublisher: id } }
        )
          .then((publisher) => {
            res.send("Данные добавлены  базу");
          })
          .catch((err) => console.log(err));
      } else {
        Publishers.create({ title: Createtitle, added: true })
          .then((publisher) => {
            res.send("Данные добавлены  базу");
          })
          .catch((err) => console.log(err));
      }
    } else {
      res.send("Такие данные уже есть. Данные не добавлены в базу");
    }
  });
};
exports.getCreateProductGroup = function (req, res) {
  res.render("crete.hbs", {
    url: "ProductGroup",
    heder: "Добавить товарную группу",
    textOne: "Товарная группа",
  });
};
exports.postCreateProductGroup = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var ProductGroups = models.productGroups;
  const Createtitle = req.body.textOne;

  ProductGroups.count({
    where: { title: Createtitle },
  }).then((count) => {
    if (count == 0) {
      ProductGroups.create({ title: Createtitle, added: true })
        .then(() => {
          res.send("Данные добавлены  базу");
        })
        .catch((err) => console.log(err));
    } else {
      res.send("Такие данные уже есть. Данные не добавлены в базу");
    }
  });
};
exports.getCreatePaymentMethod = function (req, res) {
  res.render("crete.hbs", {
    url: "PaymentMethod",
    heder: "Добавить способ оплаты",
    textOne: "Способ оплаты",
  });
};
exports.postCreatePaymentMethod = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var PaymentMethods = models.PaymentMethods;
  const Createtitle = req.body.textOne;

  PaymentMethods.count({
    where: { title: Createtitle },
  }).then((count) => {
    if (count == 0) {
      PaymentMethods.create({ title: Createtitle })
        .then(() => {
          res.send("Данные добавлены  базу");
        })
        .catch((err) => console.log(err));
    } else {
      res.send("Такие данные уже есть. Данные не добавлены в базу");
    }
  });
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
      Authors.create({
        lastName: req.body.lastName,
        name: req.body.name,
        patronymic: req.body.patronymic,
        dateOfBirth: req.body.dateOfBirth,
        dateOfDeath: req.body.dateOfDeath,
        biography: req.body.biography,
        added: true,
        idUser: User,
      })
        .then(() => {
          res.send("Данные добавлены  базу");
        })
        .catch((err) => console.log(err));
    } else {
      res.send("Такие данные уже есть. Данные не добавлены в базу");
    }
  });
};
exports.getUsersList = function (req, res) {
  var Users = models.users;
  var Sellers = models.sellers;
  var Buyers = models.buyers;
  var Warnings = models.warnings;
  Users.findAll({
    include: [Sellers, Buyers, Warnings],
  }).then((users) => {
    res.render("usersList.hbs", {
      Users: users,
      User: req.user,
    });
  });
};
function reqUserList(req, res) {
  var filtrationUser = req.body.user;
  var search = req.body.search;
  var iduser = req.body.iduser;
  var Users = models.users;
  var Sellers = models.sellers;
  var Buyers = models.buyers;
  var BlackList = models.blackList;
  var Warnings = models.warnings;
  var UserMessages = models.userMessages;
  querySearch = ``;
  if (search) {
    querySearch =
      `(CONTAINS ([users].[email], N'"*` +
      search +
      `*"') OR CONTAINS ([users].[nickname], N'"*` +
      search +
      `*"'))`;
  }
  queryFiltr = ``;
  for (var i = 0; i < filtrationUser.length; i++) {
    if (filtrationUser[i] == "all") {
      queryFiltr = ``;
    }
    if (filtrationUser[i] == "user") {
      queryFiltr = `[users].[idSeller] IS NULL and [users].[idBuyer] IS NULL`;
    }
    if (filtrationUser[i] == "sellers") {
      queryFiltr = `[users].[idSeller] IS NOT NULL`;
    }
    if (filtrationUser[i] == "buyers") {
      queryFiltr = `[users].[idBuyer] IS NOT NULL`;
    }
  }
  if (queryFiltr != ``) {
    if (querySearch != ``) {
      querySearch = querySearch + `and` + queryFiltr;
    } else {
      querySearch = queryFiltr;
    }
  }
  Users.findAll({
    where: {
      $and: sequelize.literal(querySearch),
    },
    include: [Sellers, Buyers, Warnings],
  }).then((users) => {
    res.render("partials/List.hbs", {
      Users: users,
      User: req.user,
    });
  });
}
exports.postUsersList = function (req, res) {
  var createMessage = req.body.message;
  var iduser = req.body.iduser;
  var filtrationUser = req.body.user;
  var search = req.body.search;
  var delet = req.body.delete;
  var finall = req.body.finally;
  var warning = req.body.warning;
  var addAdmin = req.body.addAdmin;
  var Users = models.users;
  var Sellers = models.sellers;
  var Buyers = models.buyers;
  var BlackList = models.blackList;
  var Warnings = models.warnings;
  var UserMessages = models.userMessages;
  if (delet) {
    BlackList.create({
      message: createMessage,
      idUser: iduser,
      deleted: true,
    });
    UserMessages.create({
      idUser: iduser,
      message:
        "Вы добавлены в черный список. Причина занесения в черный список:" +
        createMessage +
        "Вы можете оспорить решение администратора, для этого напишите ему сообщение.",
    });
    reqUserList(req, res);
  } else if (finall) {
    BlackList.update(
      {
        message: createMessage,
        idUser: iduser,
        deleted: true,
        finallyDeleted: true,
      },
      { where: { idUser: iduser } }
    );
    UserMessages.create({
      idUser: iduser,
      message:
        "Вы добавлены в черный список. БЕЗ ВОЗМОЖНОСТИ ВОССТАНОВЛЕНИЯ. Причина занесения в черный список:" +
        createMessage,
    });
    reqUserList(req, res);
  } else if (warning) {
    Warnings.create({
      idUser: iduser,
      message: createMessage,
    });
    Users.findOne({ where: { idUser: iduser } }).then((us) => {
      Users.update(
        { numberWarnings: us.numberWarnings + 1 },
        { where: { idUser: iduser } }
      );
    });
    UserMessages.create({
      idUser: iduser,
      message:
        "Вам вынесено предупреждение:" +
        createMessage +
        " В следующий раз вы можете быть занесены в черный список.",
    });
    reqUserList(req, res);
  } else if (addAdmin) {
    Users.update({ admin: true }, { where: { idUser: iduser } }).then(() => {
      reqUserList(req, res);
    });
  } else {
    reqUserList(req, res);
  }
};
exports.getBlackList = function (req, res) {
  var BlackList = models.blackList;
  var Users = models.users;
  var Warnings = models.warnings;
  Users.findAll({
    where: {
      $and: sequelize.literal(
        `idList IS NOT NULL AND [blackLists].[deleted] = 1`
      ),
    },
    include: [BlackList, Warnings],
  }).then((users) => {
    Warnings.findAll({
      include: Users,
    }).then((warnings) => {
      res.render("partials/blackList.hbs", {
        Users: users,
        Warnings: warnings,
        User: req.user,
      });
    });
  });
};
exports.postBlackList = function (req, res) {
  var iduser = req.body.iduser;
  var search = req.body.search;
  var BlackList = models.blackList;
  var Users = models.users;
  var UserMessages = models.userMessages;
  if (iduser) {
    BlackList.update({ deleted: false }, { where: { idUser: iduser } });
    UserMessages.create({
      idUser: iduser,
      message: "Вы удалены из черного списока.",
    });
  }
  query = `idList IS NOT NULL AND [blackLists].[deleted] = 1`;
  if (!iduser && search) {
    query =
      query +
      ` AND (CONTAINS ([users].[email], N'"*` +
      search +
      `*"') OR CONTAINS ([users].[nickname], N'"*` +
      search +
      `*"'))`;
  }

  Users.findAll({
    where: { $and: sequelize.literal(query) },
    include: BlackList,
  }).then((users) => {
    res.render("partials/blackList.hbs", {
      Users: users,
      User: req.user,
    });
  });
};
exports.getDiscountSystem = function (req, res) {
  var DiscountSystem = models.discountSystem;
  DiscountSystem.findAll({ order: [["minPlace", "ASC"]] }).then((discont) => {
    res.render("partials/discountSystem.hbs", {
      DiscountSystem: discont,
      User: req.user,
    });
  });
};
exports.postDiscountSystem = function (req, res) {
  var DiscountSystem = models.discountSystem;
  var CreateDiscountPercentage = parseInt(req.body.discountPercentage);
  var CreatePlaceTheTop = parseInt(req.body.placeTheTop);
  if (req.body.method == "edit") {
    DiscountSystem.findOne({ where: { idDiscount: req.body.iddiscount } }).then(
      (ds) => {
        if (isNaN(CreateDiscountPercentage)) {
          CreateDiscountPercentage = ds.discountPercentage;
        }
        if (isNaN(CreatePlaceTheTop)) {
          CreatePlaceTheTop = ds.maxPlace;
        }
      }
    );
  }
  if (req.body.method == "add") {
    if (!CreateDiscountPercentage || !CreatePlaceTheTop) {
      res.send("Ошибка. Введите данные");
      return;
    }
  }
  DiscountSystem.findAll({
    order: [["minPlace", "ASC"]],
  }).then((discont) => {
    if (discont.length) {
      for (var i = 0; i < discont.length; i++) {
        if (discont[i].minPlace < CreatePlaceTheTop) {
          if (discont[i].maxPlace > CreatePlaceTheTop) {
            if (CreateDiscountPercentage > discont[i].discountPercentage) {
              if (i != 0) {
                if (
                  CreateDiscountPercentage < discont[i - 1].discountPercentage
                ) {
                  DiscountSystem.update(
                    { minPlace: CreatePlaceTheTop + 1 },
                    { where: { idDiscount: discont[i].idDiscount } }
                  );
                  DiscountSystem.create({
                    discountPercentage: CreateDiscountPercentage,
                    minPlace: discont[i].minPlace,
                    maxPlace: CreatePlaceTheTop,
                  }).then(() => {
                    res.send("true");
                  });
                } else {
                  res.send("Ошибка не верное значение процента скидки.");
                }
              } else {
                DiscountSystem.update(
                  { minPlace: CreatePlaceTheTop + 1 },
                  { where: { idDiscount: discont[i].idDiscount } }
                );
                DiscountSystem.create({
                  discountPercentage: CreateDiscountPercentage,
                  minPlace: discont[i].minPlace,
                  maxPlace: CreatePlaceTheTop,
                }).then(() => {
                  res.send("true");
                });
              }
            } else {
              res.send("Ошибка.Введите другую сумму скидки!");
            }
          }
          if (discont[i].maxPlace == CreatePlaceTheTop) {
            if (
              i === 0 ||
              discont[i + 1].discountPercentage < CreateDiscountPercentage
            ) {
              if (i != 0) {
                if (
                  discont[i - 1].discountPercentage < CreateDiscountPercentage
                ) {
                  DiscountSystem.update(
                    { discountPercentage: CreateDiscountPercentage },
                    { where: { idDiscount: discont[i].idDiscount } }
                  ).then(() => {
                    res.send("true");
                  });
                }
              } else {
                DiscountSystem.update(
                  { discountPercentage: CreateDiscountPercentage },
                  { where: { idDiscount: discont[i].idDiscount } }
                ).then(() => {
                  res.send("true");
                });
              }
            } else {
              res.send("Ошибка. Не верный размер скидки");
            }
          }
          if (discont[i].maxPlace < CreatePlaceTheTop) {
            if (i + 1 == discont.length) {
              if (discont[i].discountPercentage > CreateDiscountPercentage) {
                DiscountSystem.create({
                  discountPercentage: CreateDiscountPercentage,
                  minPlace: discont[i].maxPlace + 1,
                  maxPlace: CreatePlaceTheTop,
                }).then(() => {
                  res.send("true");
                });
              } else {
                res.send("Ошибка. Не верный размер скидки");
              }
            } else {
              continue;
            }
          }
        } else {
          if (discont[i].minPlace == CreatePlaceTheTop) {
            if (
              CreateDiscountPercentage > discont[i].discountPercentage ||
              CreateDiscountPercentage == discont[i].discountPercentage
            ) {
              res.send("Ошибка. Не верный размер скидки");
            } else {
              DiscountSystem.update(
                {
                  minPlace: CreatePlaceTheTop + 1,
                },
                { where: { idDiscount: discont[i].idDiscount } }
              );
              DiscountSystem.update(
                {
                  maxPlace: CreatePlaceTheTop,
                },
                { where: { idDiscount: discont[i - 1].idDiscount } }
              ).then(() => {
                res.send("true");
              });
            }
          }
          if (CreatePlaceTheTop == 0) {
            res.send("Ошибка.Введите другое место в топе!");
          }
        }
      }
    } else {
      DiscountSystem.create({
        discountPercentage: CreateDiscountPercentage,
        minPlace: 0,
        maxPlace: CreatePlaceTheTop,
      }).then(() => {
        res.send("true");
      });
    }
  });
};

exports.getSubmissionApplications = function (req, res) {
  var Books = models.books;
  var Genres = models.genres;
  var Authors = models.authors;
  var Publishers = models.publishers;
  var PhotoBooks = models.photoBooks;
  Books.findAll({
    where: {
      delete: false,
      show: false,
    },
    include: [PhotoBooks, Authors, Genres],
  }).then((books) => {
    Genres.findAll({
      where: { added: false },
      order: [["title", "ASC"]],
    }).then((genres) => {
      Authors.findAll({
        where: { added: false },
        order: [["lastName", "ASC"]],
      }).then((authors) => {
        Publishers.findAll({
          where: { added: false },
          order: [["title", "ASC"]],
        }).then((publishers) => {
          res.render("partials/submissionApplications.hbs", {
            Books: books,
            Genres: genres,
            Authors: authors,
            Publishers: publishers,
            User: req.user,
          });
        });
      });
    });
  });
};
function selectionApplications(selection, req, res) {
  var Books = models.books;
  var Genres = models.genres;
  var Authors = models.authors;
  var Publishers = models.publishers;
  var PhotoBooks = models.photoBooks;
  if (selection == "books") {
    Books.findAll({
      where: {
        delete: false,
        show: false,
      },
      include: [PhotoBooks, Authors, Genres],
    }).then((books) => {
      res.render("partials/submissionApplications.hbs", {
        Books: books,
        User: req.user,
      });
    });
  }
  if (selection == "genres") {
    Genres.findAll({ where: { added: false }, order: [["title", "ASC"]] }).then(
      (genres) => {
        res.render("partials/submissionApplications.hbs", {
          Genres: genres,
          User: req.user,
        });
      }
    );
  }
  if (selection == "authors") {
    Authors.findAll({
      where: { added: false },
      order: [["lastName", "ASC"]],
    }).then((authors) => {
      res.render("partials/submissionApplications.hbs", {
        Authors: authors,
        User: req.user,
      });
    });
  }
  if (selection == "publishers") {
    Publishers.findAll({
      where: { added: false },
      order: [["title", "ASC"]],
    }).then((publishers) => {
      res.render("partials/submissionApplications.hbs", {
        Publishers: publishers,
        User: req.user,
      });
    });
  }
}
function submission(selection, req, res) {
  var Books = models.books;
  var Genres = models.genres;
  var Authors = models.authors;
  var Publishers = models.publishers;
  var selection = req.body.selection;
  var id = req.body.id;
  var renouncement = req.body.renouncement;
  var message = req.body.message;
  var UserMessages = models.userMessages;
  var Subscriptions = models.subscriptions;
  var Warnings = models.warnings;
  var PhotoBooks = models.photoBooks;
  Books.findAll({
    where: { show: false },
    include: [PhotoBooks, Authors, Genres],
  }).then((books) => {
    Genres.findAll({ where: { added: false }, order: [["title", "ASC"]] }).then(
      (genres) => {
        Authors.findAll({
          where: { added: false },
          order: [["lastName", "ASC"]],
        }).then((authors) => {
          Publishers.findAll({
            where: { added: false },
            order: [["title", "ASC"]],
          }).then((publishers) => {
            res.render("partials/submissionApplications.hbs", {
              Books: books,
              Genres: genres,
              Authors: authors,
              Publishers: publishers,
              User: req.user,
            });
          });
        });
      }
    );
  });
}
exports.postSubmissionApplications = function (req, res) {
  var Books = models.books;
  var Genres = models.genres;
  var Authors = models.authors;
  var Publishers = models.publishers;
  var selection = req.body.selection;
  var id = req.body.id;
  var renouncement = req.body.renouncement;
  var message = req.body.message;
  var UserMessages = models.userMessages;
  var Subscriptions = models.subscriptions;
  var Warnings = models.warnings;
  var PhotoBooks = models.photoBooks;

  if (id != 0) {
    if (selection == "books") {
      Books.findOne({
        where: { idBook: id },
        include: [PhotoBooks, Authors, Genres],
      }).then((model) => {
        if (renouncement) {
          Genres.findAll({ include: Books }).then((genres) => {
            genres.forEach(function (G, i, genres) {
              Subscriptions.findAll({ where: { idGenre: G.idGenre } }).then(
                (subscriptions) => {
                  subscriptions.forEach(function (S, i, subscriptions) {
                    UserMessages.create({
                      idUser: S.idUser,
                      message:
                        "На платформу добавлена книга в жанре " +
                        G.title +
                        ", на который вы подписаны. http://localhost:5000/book/" +
                        id +
                        "",
                    });
                  });
                }
              );
            });
          });
          Books.update({ show: true }, { where: { idBook: id } }).then(() => {
            UserMessages.create({
              message:
                "Заявка на выставление книги принята. Оплатите выставление книги на прлатформе,после книга будет выставлена на продажу.",
              idUser: model.idUser,
            }).then(() => {
              submission(selection, req, res);
            });
          });
        } else {
          Books.destroy({ where: { idBook: id } }).then(() => {
            Warnings.create({
              idUser: model.idUser,
              message:
                'Заявка на выставление книги "' +
                model.title +
                '" была откланена',
            });
            UserMessages.create({
              message: "Заявка на выставление книги НЕ принята." + message,
              idUser: model.idUser,
            }).then(() => {
              submission(selection, req, res);
            });
          });
        }
      });
    }
    if (selection == "genres") {
      Genres.findOne({ where: { idGenre: id } }).then((model) => {
        if (renouncement) {
          Genres.update({ added: true }, { where: { idGenre: id } }).then(
            () => {
              UserMessages.create({
                message: "Заявка на добавление жанра принята.",
                idUser: model.idUser,
              }).then(() => {
                submission(selection, req, res);
              });
            }
          );
        } else {
          Genres.update({ delete: true }, { where: { idGenre: id } }).then(
            () => {
              UserMessages.create({
                message: "Заявка на добавление жанра НЕ принята." + message,
                idUser: model.idUser,
              }).then(() => {
                submission(selection, req, res);
              });
            }
          );
        }
      });
    }
    if (selection == "authors") {
      Authors.findOne({
        where: { idAuthor: id },
      }).then((model) => {
        if (renouncement) {
          Authors.update({ added: true }, { where: { idAuthor: id } }).then(
            () => {
              UserMessages.create({
                message: "Заявка на добавление автора принята.",
                idUser: model.idUser,
              }).then(() => {
                submission(selection, req, res);
              });
            }
          );
        } else {
          Authors.update({ delete: true }, { where: { idAuthor: id } }).then(
            () => {
              UserMessages.create({
                message: "Заявка на добавление автора НЕ принята." + message,
                idUser: model.idUser,
              }).then(() => {
                submission(selection, req, res);
              });
            }
          );
        }
      });
    }
    if (selection == "publishers") {
      Publishers.findOne({ where: { idPublisher: id } }).then((model) => {
        if (renouncement) {
          Publishers.update(
            { added: true },
            { where: { idPublisher: id } }
          ).then(() => {
            UserMessages.create({
              message: "Заявка на добавление издательства принята.",
              idUser: model.idUser,
            }).then(() => {
              submission(selection, req, res);
            });
          });
        } else {
          Publishers.update(
            { delete: true },
            { where: { idPublisher: id } }
          ).then(() => {
            UserMessages.create({
              message:
                "Заявка на добавление издательства НЕ принята." + message,
              idUser: model.idUser,
            }).then(() => {
              submission(selection, req, res);
            });
          });
        }
      });
    }
  } else {
    submission(selection, req, res);
  }
};
exports.getSales = function (req, res) {
  var Books = models.books;
  var Lots = models.lots;
  var PhotoBooks = models.photoBooks;
  var Authors = models.authors;
  Books.findAll({
    where: {
      delete: false,
      show: true,
    },
    include: [Lots, PhotoBooks, Authors],
  }).then((books) => {
    res.render("partials/sales.hbs", {
      Books: books,
      User: req.user,
    });
  });
};
exports.postSales = function (req, res) {
  var Books = models.books;
  var Lots = models.lots;
  var UserMessages = models.userMessages;
  var PhotoBooks = models.photoBooks;
  var Auctions = models.auctions;
  var Authors = models.authors;
  var id = req.body.id;
  var search = req.body.search;
  var message = req.body.message;

  if (!id) {
    querySearch = "";
    if (search) {
      querySearch =
        `(CONTAINS ([books].[title], N'"*` +
        search +
        `*"') OR CONTAINS ([books].[annotation], N'"*` +
        search +
        `*"') OR CONTAINS ([books].[description], N'"*` +
        search +
        `*"'))`;
    }
    Books.findAll({
      where: {
        show: true,
        delete: false,
        $and: sequelize.literal(querySearch),
      },
      include: [Lots, PhotoBooks, Authors],
    }).then((books) => {
      res.render("partials/sales.hbs", {
        Books: books,
        User: req.user,
      });
    });
  } else {
    Books.findOne({
      where: { idBook: id },
      include: [PhotoBooks, Authors],
    }).then((book) => {
      Lots.findOne({ where: { idBook: id } }).then((lot) => {
        var ms = "";
        if (lot) {
          ms = "Лот снят с аукциона. Книга удалена с платформы. ";
          Auctions.findAll({ where: { idLot: lot.idLot } }).then((auction) => {
            for (var i = 0; i < auction.length; i++) {
              UserMessages.create({
                message: "Аукцион закрыт администратором.",
                idUser: auction.idUser,
              });
            }
          });
        } else {
          ms = "Книга удалена с платформы. ";
        }
        Books.update({ delete: true }, { where: { idBook: id } }).then(() => {
          UserMessages.create({
            message: ms + message,
            idUser: book.idUser,
          }).then(() => {
            Books.findAll({
              where: { show: true, delete: false, $and: sequelize.literal() },
              include: [Lots, PhotoBooks, Authors],
            }).then((books) => {
              res.render("partials/sales.hbs", {
                Books: books,
                User: req.user,
              });
            });
          });
        });
      });
    });
  }
};
exports.getAdminMessages = function (req, res) {
  var CommentSites = models.commentSite;
  CommentSites.findAll({ order: [["idComment", "DESC"]] }).then((comments) => {
    res.render("partials/adminMessages.hbs", {
      CommentSites: comments,
      User: req.user,
    });
  });
};

exports.postAdminMessages = function (req, res) {
  var CommentSites = models.commentSite;
  var UserMessages = models.userMessages;
  var iduser = req.body.iduser;
  var idcomment = req.body.idcomment;
  var read = req.body.read;
  if (read) {
    CommentSites.update({ read: true }, { where: { idComment: idcomment } });
  } else {
    var message = req.body.message;
    CommentSites.update({ read: true }, { where: { idComment: idcomment } });
    CommentSites.findOne({ where: { idComment: idcomment } }).then(
      (comment) => {
        UserMessages.create({
          message:
            "Отвечая на ваше сообщение:\r" + comment.message + "\r" + message,
          idUser: iduser,
        });
      }
    );
  }
};

exports.getTransactions = function (req, res) {
  var Orders = models.orders;
  var Baskets = models.baskets;
  var Users = models.users;
  var Lots = models.lots;
  var Books = models.books;
  var PhotoBooks = models.photoBooks;
  Baskets.findAll({
    include: [
      {
        model: Orders,
        required: true,
      },
      { model: Users },
      { model: Books, include: [Users, Lots, PhotoBooks] },
    ],
  }).then((baskets) => {
    res.render("partials/transactions.hbs", {
      Baskets: baskets,
      User: req.user,
    });
  });
};
