var models = require("../models");
const sequelize = require("sequelize");

exports.getUser = function (req, res) {
  var Users = models.users;
  var Buyers = models.buyers;
  var Sellers = models.sellers;
  Users.findOne({
    where: { idUser: parseInt(req.user.idUser) },
    include: [Buyers, Sellers],
  }).then((User) => {
    res.render("user.hbs", { User: User });
  });
};

exports.getProfile = function (req, res) {
  var Users = models.users;
  var Buyers = models.buyers;
  var Sellers = models.sellers;
  Users.findOne({
    where: { idUser: parseInt(req.user.idUser) },
    include: [Buyers, Sellers],
  }).then((User) => {
    res.render("partials/profile.hbs", { User: User });
  });
};

exports.getCreateBook = function (req, res) {
  var Genres = models.genres;
  var Publishers = models.publishers;
  var States = models.states;
  var ProductGroups = models.productGroups;
  var TypesOfBindings = models.typesOfBindings;
  var PaymentMethod = models.PaymentMethods;
  var DeliveryMethod = models.DeliveryMethods;
  var InformationDelivery = models.InformationDeliveries;
  var Authors = models.authors;
  Genres.findAll({ order: [["title", "ASC"]] }).then((Genres) => {
    Publishers.findAll({ order: [["title", "ASC"]] }).then((Publishers) => {
      States.findAll({ raw: true }).then((States) => {
        ProductGroups.findAll({ raw: true }).then((ProductGroups) => {
          TypesOfBindings.findAll({ raw: true }).then((TypesOfBindings) => {
            PaymentMethod.findAll({ raw: true }).then((PaymentMethod) => {
              DeliveryMethod.findAll({ raw: true }).then((DeliveryMethod) => {
                InformationDelivery.findAll({ raw: true }).then(
                  (InformationDelivery) => {
                    Authors.findAll({ order: [["lastName", "ASC"]] }).then(
                      (Authors) => {
                        res.render("createBook.hbs", {
                          Genres: Genres,
                          Publishers: Publishers,
                          States: States,
                          ProductGroups: ProductGroups,
                          TypesOfBindings: TypesOfBindings,
                          PaymentMethod: PaymentMethod,
                          DeliveryMethod: DeliveryMethod,
                          InformationDelivery: InformationDelivery,
                          Authors: Authors,
                          User: req.user,
                        });
                      }
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
  });
};
exports.postCreateBook = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var Books = models.books;
  var BookGenres = models.BookGenres;
  var BookAuthors = models.BookAuthors;
  var BookPayments = models.BookPayments;
  var BookDeliveries = models.BookDeliveries; //Информация о доставке-Книга -
  var SellerDeliveries = models.SellerDeliveries;
  var BookInformations = models.BookInformations;
  var Sellers = models.sellers;
  var Users = models.users;
  var Lots = models.lots;
  const CreateTitle = req.body.title;
  const CreateFormat = req.body.format;
  const CreateNumberOfPages = req.body.numberOfPages;
  const CreateDescription = req.body.description;
  const CreateYearOfPublishing = req.body.yearOfPublishing;
  const CreatePrice = req.body.price;
  const CreateShow = false;
  const CreateGenre = req.body.Genres; //несколько элементов
  const CreateState = req.body.States;
  const CreatePublisher = req.body.Publisher;
  const CreateProductGroup = req.body.ProductGroup;
  const CreateTypesOfBinding = req.body.TypesOfBinding;
  const CreatePaymentMethod = req.body.PaymentMethod;
  const CreateDeliveryMethod = req.body.DeliveryMethod;
  const CreateInformationDelivery = req.body.InformationDelivery;
  const auction = req.body.auction;
  const CreateAuthor = req.body.Authors; //несколько элементов

  const CreateBBK = req.body.BBK;
  const CreateUDC = req.body.UDC;
  const CreateISBN = req.body.ISBN;
  const CreateAnnotation = req.body.annotation;

  var sr = "";
  for (var i = 0; i < CreateAuthor.length; i++) {
    sr = sr + "[i]:" + CreateAuthor[i] + " ";
  }
  var nowDate = new Date();
  Books.update(
    {
      title: CreateTitle,
      yearOfPublishing: CreateYearOfPublishing,
      format: CreateFormat,
      numberOfPages: CreateNumberOfPages,
      description: CreateDescription,
      Show: CreateShow,
      idState: CreateState,
      idUser: req.user.idUser,
      price: CreatePrice,
      idGroup: CreateProductGroup,
      idBinding: CreateTypesOfBinding,
      idPublisher: CreatePublisher,
      arrivalTime: nowDate,
      BBK: CreateBBK,
      UDC: CreateUDC,
      ISBN: CreateISBN,
      annotation: CreateAnnotation,
    },
    { where: { title: "1", idUser: req.user.idUser } }
  )
    .then(() => {
      Books.findOne({
        where: { title: CreateTitle, idUser: req.user.idUser },
      }).then((book) => {
        if (!book) {
          Books.create({
            title: CreateTitle,
            yearOfPublishing: CreateYearOfPublishing,
            format: CreateFormat,
            numberOfPages: CreateNumberOfPages,
            description: CreateDescription,
            Show: CreateShow,
            idState: CreateState,
            idUser: req.user.idUser,
            price: CreatePrice,
            idGroup: CreateProductGroup,
            idBinding: CreateTypesOfBinding,
            idPublisher: CreatePublisher,
            arrivalTime: nowDate,
            BBK: CreateBBK,
            UDC: CreateUDC,
            ISBN: CreateISBN,
            annotation: CreateAnnotation,
          }).then((book) => {
            CreateAuthor.forEach(function (A, i, CreateAuthor) {
              BookAuthors.create({
                idBook: book.idBook,
                idAuthor: A,
              });
            });
            CreateGenre.forEach(function (G, i, CreateGenre) {
              BookGenres.create({
                idBook: book.idBook,
                idGenre: G,
              });
            });
            CreatePaymentMethod.forEach(function (PM, i, CreatePaymentMethod) {
              BookPayments.create({
                idBook: book.idBook,
                idPayment: PM,
              });
            });

            CreateInformationDelivery.forEach(function (
              informDeliv,
              i,
              CreateInformationDelivery
            ) {
              BookInformations.create({
                idBook: book.idBook,
                idInformation: informDeliv,
              });
            });

            Sellers.findOne({
              include: [{ model: Users, where: { idUser: req.user.idUser } }],
            }).then((seller) => {
              CreateDeliveryMethod.forEach(function (
                DM,
                i,
                CreateDeliveryMethod
              ) {
                BookDeliveries.create({
                  idBook: book.idBook,
                  idDelivery: DM,
                });
                SellerDeliveries.destroy({
                  where: {
                    idSeller: seller.idSeller,
                    idDelivery: DM,
                  },
                });
                SellerDeliveries.create({
                  idSeller: seller.idSeller,
                  idDelivery: DM,
                });
              });
            });
            if (auction) {
              //выставляем на аукцион
              const CreateStartDate = req.body.startDate;
              const CreateEndDate = req.body.endDate;
              const CreateMinRate = req.body.minRate;
              Lots.create({
                idBook: book.idBook,
                numberOfBets: 0,
                startDate: CreateStartDate,
                endDate: CreateEndDate,
                minRate: CreateMinRate,
                currentPrice: CreatePrice,
              });
            }
          });
        }
        CreateAuthor.forEach(function (A, i, CreateAuthor) {
          BookAuthors.create({
            idBook: book.idBook,
            idAuthor: A,
          });
        });
        CreateGenre.forEach(function (G, i, CreateGenre) {
          BookGenres.create({
            idBook: book.idBook,
            idGenre: G,
          });
        });
        CreatePaymentMethod.forEach(function (PM, i, CreatePaymentMethod) {
          BookPayments.create({
            idBook: book.idBook,
            idPayment: PM,
          });
        });

        CreateInformationDelivery.forEach(function (
          informDeliv,
          i,
          CreateInformationDelivery
        ) {
          BookInformations.create({
            idBook: book.idBook,
            idInformation: informDeliv,
          });
        });

        Sellers.findOne({
          include: [{ model: Users, where: { idUser: req.user.idUser } }],
        }).then((seller) => {
          CreateDeliveryMethod.forEach(function (DM, i, CreateDeliveryMethod) {
            BookDeliveries.create({
              idBook: book.idBook,
              idDelivery: DM,
            });
            SellerDeliveries.destroy({
              where: {
                idSeller: seller.idSeller,
                idDelivery: DM,
              },
            });
            SellerDeliveries.create({
              idSeller: seller.idSeller,
              idDelivery: DM,
            });
          });
        });
        if (auction) {
          //выставляем на аукцион
          const CreateStartDate = req.body.startDate;
          const CreateEndDate = req.body.endDate;
          const CreateMinRate = req.body.minRate;
          Lots.create({
            idBook: book.idBook,
            numberOfBets: 0,
            startDate: CreateStartDate,
            endDate: CreateEndDate,
            minRate: CreateMinRate,
            currentPrice: CreatePrice,
          });
        }
      });
    })

    .then(() => {
      res.send("/");
    })
    .catch((err) => console.log(err));
};
exports.getCreatePhotoBook = function (req, res) {
  res.render("createPhotoBook.hbs", {
    User: req.user,
  });
};
exports.postCreatePhotoBook = function (req, res) {
  var Books = models.books;
  var PhotoBooks = models.photoBooks;
  Books.create({
    title: "1",
    yearOfPublishing: 1951,
    format: "1 * 1 * 1",
    numberOfPages: "1",
    description: "1",
    Show: false,
    idUser: req.user.idUser,
    price: 1,
  }).then((book) => {
    for (var i = 0; i < req.files.length; i++) {
      var path = "" + req.files[i].filename;
      PhotoBooks.create({
        idBook: book.idBook,
        URL: path,
      });
    }
    res.redirect("/user/createBook");
  });
};
exports.getCart = function (req, res) {
  var User = parseInt(req.user.idUser);
  var Baskets = models.baskets;
  var Books = models.books;
  var Orders = models.orders;
  var PhotoBooks = models.photoBooks;
  var PaymentMethods = models.PaymentMethods; //способ оплаты
  var DeliveryMethods = models.DeliveryMethods; //способ доставки
  var Users = models.users;
  Baskets.findAll({
    where: { idUser: User, $and: sequelize.literal(`idOrder IS NULL`) },
    include: [
      {
        model: Books,
        include: [PaymentMethods, DeliveryMethods, PhotoBooks, Users],
      },
      Orders,
    ],
  }).then((Basket) => {
    res.render("cart.hbs", {
      Baskets: Basket,
      User: req.user,
    });
  });
};
exports.postCart = function (req, res) {
  var PaymentMethods = models.PaymentMethods; //способ оплаты
  var DeliveryMethods = models.DeliveryMethods; //способ доставки
  var iduser = parseInt(req.user.idUser);
  var Baskets = models.baskets;
  var Books = models.books;
  var Orders = models.orders;
  var PhotoBooks = models.photoBooks;
  var BookPayments = models.BookPayments; //idPayment
  var BookDeliveries = models.BookDeliveries;
  var Users = models.users;

  if (req.body.checked) {
    //если оплата
    Users.findOne({ where: { idUser: iduser } }).then((user) => {
      if (!user.idBuyer) {
        //нет дополнительных данных покупателя
        res.send({
          answer: false,
          message: "Пожалуйста, заполните дополнительные данные ;-)",
          url: '<br><p><a href="/user/additionalData">Добавить данные</a></p>',
        });
      } else {
        var idbasket = req.body.idbasket;
        var idbook = req.body.idbook;
        var paymentMethod = req.body.paymentMethod;
        var deliveryMethod = req.body.deliveryMethod;
        Orders.create({ idBasket: idbasket, getting: false });
        Books.update({ bought: true }, { where: { idBook: idbook } });
        BookPayments.update(
          { selected: true },
          { where: { idBook: idbook, idPayment: paymentMethod } }
        );
        BookDeliveries.update(
          { selected: true },
          { where: { idBook: idbook, idDelivery: deliveryMethod } }
        );
        res.send({
          answer: false,
          message: "Книга оплачена! :-)",
        });
      }
    });
  } else if (req.body.renouncement) {
    //удалить лот или книгу
    var idbascet = req.body.idbascet;
    Baskets.findOne({ where: { idBasket: idbascet } }).then((basket) => {
      if (basket.idLot) {
        //если это лот - нельзя отказаться
        res.send("Нельзя отказаться от покупки выигранного лота");
      } else {
        //это не лот
        Baskets.destroy({ where: { idBasket: idbascet } });
        res.send("Книга удалена из заказов");
      }
    });
  } else {
    //если не оплата
    var list = req.body.list;
    var auction = req.body.auction;
    if (list == "Basket") {
      if (auction) {
        Baskets.findAll({
          where: {
            idUser: iduser,
            $and: sequelize.literal(`idOrder IS NULL AND idLot IS NOT NULL`),
          },
          include: [
            {
              model: Books,
              include: [PaymentMethods, DeliveryMethods, PhotoBooks, Users],
            },
            Orders,
          ],
        }).then((Baskets) => {
          res.render("partials/basket.hbs", {
            Baskets: Baskets,
            User: req.user,
          });
        });
      } else if (!auction) {
        Baskets.findAll({
          where: {
            idUser: iduser,
            $and: sequelize.literal(`idOrder IS NULL`),
          },
          include: [
            {
              model: Books,
              include: [PaymentMethods, DeliveryMethods, PhotoBooks, Users],
            },
            Orders,
          ],
        }).then((Baskets) => {
          res.render("partials/basket.hbs", {
            Baskets: Baskets,
            User: req.user,
          });
        });
      }
    } else if (list == "Orders") {
      if (auction) {
        Orders.findAll({
          where: {},
          include: [
            {
              model: Baskets,
              where: {
                idUser: iduser,
                $and: sequelize.literal("idLot IS NOT NULL"),
              },
              include: [
                {
                  model: Books,
                  include: [PaymentMethods, DeliveryMethods, PhotoBooks, Users],
                },
              ],
            },
          ],
        }).then((Orders) => {
          res.render("partials/orders.hbs", {
            Orders: Orders,
            User: req.user,
          });
        });
      } else if (!auction) {
        Orders.findAll({
          where: {},
          include: [
            {
              model: Baskets,
              where: { idUser: iduser },
              include: [
                {
                  model: Books,
                  include: [PaymentMethods, DeliveryMethods, PhotoBooks, Users],
                },
              ],
            },
          ],
        }).then((Orders) => {
          res.render("partials/orders.hbs", {
            Orders: Orders,
            User: req.user,
          });
        });
      }
    }
  }
};
exports.getAdditionalDate = function (req, res) {
  var iduser = req.user.idUser;
  var Users = models.users;
  var Sellers = models.sellers;
  var Buyers = models.buyers;
  Users.findOne({ where: { idUser: iduser }, include: [Sellers, Buyers] }).then(
    (Users) => {
      res.render("additionalData.hbs", {
        UsersDate: Users,
        User: req.user,
      });
    }
  );
};
exports.postAdditionalDate = function (req, res) {
  var iduser = parseInt(req.user.idUser);
  var Users = models.users;
  var Sellers = models.sellers;
  var Buyers = models.buyers;
  if (req.body.password) {
    Users.update(
      { password: req.body.password },
      { where: { idUser: iduser } }
    );
  }
  if (req.file) {
    var path = "" + req.file.filename;
    Users.update({ avatar: path }, { where: { idUser: iduser } });
  }
  Users.findOne({ where: { idUser: iduser } }).then((Users) => {
    if (Users.idSeller == undefined) {
      Sellers.create({
        country: req.body.country,
        city: req.body.city,
        InformationAdditional: req.body.InformationAdditionalSellers,
        region: req.body.regionSellers,
        postcode: req.body.postcode,
        telephone: req.body.telephone,
        numberOfSales: 0,
        numberOfBooks: 0,
      }).then((Sellers) => {
        Users.update(
          { idSeller: Sellers.idSeller },
          { where: { idUser: iduser } }
        );
      });
    } else {
      Sellers.update(
        {
          country: req.body.country,
          city: req.body.city,
          InformationAdditional: req.body.InformationAdditionalSellers,
          region: req.body.regionSellers,
          postcode: req.body.postcode,
          telephone: req.body.telephone,
        },
        { where: { idSeller: Users.idSeller } }
      );
    }
    if (Users.idBuyer == undefined) {
      Buyers.create({
        lastName: req.body.lastNameBuyers,
        name: req.body.nameBuyers,
        patronymic: req.body.patronymicBuyers,
        country: req.body.country,
        city: req.body.city,
        address: req.body.addressBuyers,
        postcode: req.body.postcode,
        telephone: req.body.telephone,
      }).then((Buyers) => {
        Users.update(
          { idBuyer: Buyers.idBuyer },
          { where: { idUser: iduser } }
        );
      });
    } else {
      Buyers.update(
        {
          lastName: req.body.lastNameBuyers,
          name: req.body.nameBuyers,
          patronymic: req.body.patronymicBuyers,
          country: req.body.country,
          city: req.body.city,
          address: req.body.addressBuyers,
          postcode: req.body.postcode,
          telephone: req.body.telephone,
        },
        { where: { idBuyer: Users.idBuyer } }
      );
    }
    res.send("Данные изменены");
  });
};
exports.getCreateMessageAdmin = function (req, res) {
  res.render("crete.hbs", {
    url: "MessageAdmin",
    heder: "Сообщение администратору",
    textOne: "Сообщение",
    button: "Отправить",
    textarea: true,
  });
};
exports.postCreateMessageAdmin = function (req, res) {
  var CommentSite = models.commentSite;
  const CreateMessage = req.body.textOne;
  CommentSite.create({
    message: CreateMessage,
    idUser: req.user.idUser,
  })
    .then(() => {
      res.redirect("/user");
    })
    .catch((err) => console.log(err));
};
exports.addBascet = function (req, res) {
  const Booksid = req.params.idBook;
  var User = parseInt(req.user.idUser);
  var Baskets = models.baskets;
  var Lots = models.lots;
  var Books = models.books;
  var nowDate = new Date();
  var enDate = new Date();
  enDate.setDate(enDate.getDate() + 5);
  Baskets.count({ where: { idBook: Booksid } }).then((count) => {
    if (count == 0) {
      //не у кого в корзине не лежит
      Baskets.create({
        idBook: Booksid,
        idUser: User,
      })
        .then(() => {
          res.redirect("/user/cart"); //переходим в корзину
        })
        .catch((err) => console.log(err));
    } else {
      //аукцион
      Lots.count({ where: { idBook: Booksid } }).then((count) => {
        if (count == 0) {
          //создаем аукцион
          var idBasc;
          Baskets.create({
            idBook: Booksid,
            idUser: User,
          }).then((bs) => {
            idBasc = bs.idBasket;
          });
          Baskets.findAll({ where: { idBook: Booksid } }).then((bascet) => {
            Books.findOne({ where: { idBook: Booksid } }).then((book) => {
              Lots.create({
                numberOfBets: 0,
                startDate: nowDate,
                endDate: enDate,
                minRate: book.price * 0.1,
                currentPrice: book.price,
                idBook: Booksid,
              })
                .then((lot) => {
                  bascet.forEach(function (b, i, bascet) {
                    Baskets.update(
                      { idLot: lot.idLot },
                      { where: { idBasket: b.idBasket } }
                    );
                  });
                  Baskets.update(
                    { idLot: lot.idLot },
                    { where: { idBasket: idBasc } }
                  );
                  res.redirect("/user/cart");
                })
                .catch((err) => console.log(err));
            });
          });
        } else {
          Lots.findOne({ where: { idBook: Booksid } })
            .then((lot) => {
              Baskets.create({
                idBook: Booksid,
                idUser: User,
                idLot: lot.idLot,
              }).then((bs) => {
                res.redirect("/user/cart");
              });
            })
            .catch((err) => console.log(err));
        }
      });
    }
  });
};
exports.myMessages = function (req, res) {
  var idUser = parseInt(req.user.idUser);
  var UserMessages = models.userMessages;
  var Comments = models.comments;
  var Users = models.users;
  UserMessages.findAll({
    where: { idUser: idUser },
    order: [["idMessage", "DESC"]],
  }).then((userMessage) => {
    Comments.findAll({
      where: { idSeller: idUser },
      include: Users,
      order: [["idReview", "DESC"]],
    }).then((comment) => {
      for (var i = 0; i < comment.length; i++) {
        var newDate = new Date(comment[i].dateComment);
        comment[i].dateComment = newDate.toLocaleString();
        newDate = new Date(comment[i].dateResponse);
        comment[i].dateResponse = newDate.toLocaleString();
      }
      res.render("myMessages.hbs", {
        UserMessages: userMessage,
        Comments: comment,
        User: req.user,
      });
    });
  });
};
exports.postMyMessages = function (req, res) {
  const idUserMessage = req.body.idMessage;
  var idUser = parseInt(req.user.idUser);
  var UserMessages = models.userMessages;
  var Comments = models.comments;
  var Users = models.users;
  UserMessages.update(
    { read: true },
    { where: { idMessage: idUserMessage } }
  ).then(() => {
    res.send("Сообщение отмечено, как прочитанное :-)");
  });
};
exports.getResponseToReview = function (req, res) {
  res.render("ResponseToReview.hbs");
};
exports.postResponseToReview = function (req, res) {
  const idreview = req.params.idreview;
  const createResponse = req.body.response;
  var Comments = models.comments;

  Comments.update(
    { sellerResponse: createResponse },
    { where: { idReview: idreview } }
  ).then(() => {
    res.redirect("/user/myMessages");
  });
};
exports.getAuctions = function (req, res) {
  var idUser = parseInt(req.user.idUser);
  var Users = models.users;
  var Books = models.books;
  var Baskets = models.baskets;
  var Lots = models.lots;
  var PhotoBooks = models.photoBooks;
  Lots.findAll({
    include: [
      {
        model: Baskets,
        where: { idUser: idUser },
      },
      Users,
      { model: Books, where: { show: true }, include: [PhotoBooks] },
    ],
  }).then((lots) => {
    res.render("Auctions.hbs", {
      User: req.user,
      Lots: lots,
    });
  });
};
exports.postAuctions = function (req, res) {
  var click = req.body.click;
  var idlot = req.body.idLot;
  var iduser = parseInt(req.user.idUser);
  var Baskets = models.baskets;
  var Lots = models.lots;
  var Auctions = models.auctions;
  var str = "";
  if (click == "rate") {
    //сделать ставку
    var myRate = parseInt(req.body.myRate);
    Lots.findOne({ where: { idLot: idlot } }).then((lot) => {
      var nowDate = new Date();
      var nowPrice = lot.currentPrice + myRate;
      var nowNumberOfBets = lot.numberOfBets + 1;
      Lots.update(
        {
          currentPrice: nowPrice,
          idLeader: iduser,
          numberOfBets: nowNumberOfBets,
        },
        { where: { idLot: idlot } }
      );
      Auctions.create({
        price: nowPrice,
        bidDate: nowDate,
        idLot: lot.idLot,
        idUser: iduser,
      });
    });
    str = "Ставка принята! :-)";
    res.send(str);
  }
  if (click == "renouncement") {
    str = "!";
    //Отказаться от участия
    Lots.findOne({ where: { idLot: idlot } }).then((lot) => {
      Auctions.count({ where: { idLot: idlot, idUser: iduser } }).then(
        (count) => {
          if (count == 0) {
            //ставок по этому лота от пользователя нет
            Baskets.destroy({ where: { idUser: iduser, idLot: idlot } }).then(
              () => {
                str = "Вы больше не участвуете в аукционе! :-(";
                res.send(str);
              }
            );
          } else {
            //уже участвует в аукционе - есть ставки от пользователя
            str = "Вы уже делали ставки! ;-)";
            res.send(str);
          }
        }
      );
    });
  }
};
exports.getBookAuctions = function (req, res) {
  var iduser = parseInt(req.user.idUser);
  var Books = models.books;
  var Lots = models.lots;
  var PhotoBooks = models.photoBooks;
  Books.findAll({
    where: {
      show: true,
      idUser: iduser,
    },
    include: [{ model: Lots, required: true }, PhotoBooks],
  }).then((book) => {
    res.render("bookAuctions.hbs", {
      User: req.user,
      Books: book,
    });
  });
};
exports.postBookAuctions = function (req, res) {
  var idlot = req.body.idlot;
  var iduser = parseInt(req.user.idUser);
  var Books = models.books;
  var Lots = models.lots;
  Lots.findOne({ where: { idLot: idlot }, include: Books })
    .then((lot) => {
      Books.update({ delete: true }, { where: { idBook: lot.idBook } });
      Lots.destroy({ where: { idLot: idlot } });
    })
    .then(() => {
      res.send("/user/bookAuctions");
    });
};
exports.getDeleteBook = function (req, res) {
  var iduser = parseInt(req.user.idUser);
  var Books = models.books;
  var Lots = models.lots;
  var PhotoBooks = models.photoBooks;
  Books.findAll({
    where: {
      show: true,
      idUser: iduser,
      $and: sequelize.literal(`Lot.idLot IS NULL`),
    },
    include: [Lots, PhotoBooks],
  }).then((book) => {
    res.render("deleteBook.hbs", {
      User: req.user,
      Books: book,
    });
  });
};
exports.postDeleteBook = function (req, res) {
  var idbook = req.body.idbook;
  var Books = models.books;
  Books.update(
    { delete: true },
    {
      where: {
        idBook: idbook,
      },
    }
  ).then(() => {
    res.send("/user/deleteBook");
  });
};
exports.getMyBook = function (req, res) {
  var iduser = parseInt(req.user.idUser);
  var Books = models.books;
  var Lots = models.lots;
  var PhotoBooks = models.photoBooks;
  Books.findAll({
    where: {
      delete: false,
      idUser: iduser,
    },
    include: [Lots, PhotoBooks],
  }).then((book) => {
    res.render("myBook.hbs", {
      User: req.user,
      Books: book,
    });
  });
};
exports.postMyBook = function (req, res) {
  //оплата места для продажи
  var iduser = parseInt(req.user.idUser);
  var idbook = req.body.idbook;
  var Books = models.books;
  Books.update({ show: true, paid: true }, { where: { idBook: idbook } });
  res.send("Книга оплачена");
};
exports.getBooksPurchased = function (req, res) {
  var iduser = parseInt(req.user.idUser);
  var Baskets = models.baskets;
  var Books = models.books;
  var Orders = models.orders;
  var PhotoBooks = models.photoBooks;
  var Authors = models.authors;
  var Lots = models.lots;
  Baskets.findAll({
    where: {
      $and: sequelize.literal(`idOrder IS NOT NULL`),
    },
    include: [
      {
        model: Books,
        where: { idUser: iduser },
        include: [PhotoBooks, Authors],
      },
      Orders,
      Lots,
    ],
  }).then((basket) => {
    var sum = 0;
    for (var i = 0; i < basket.length; i++) {
      if (basket[i].idLot) {
        sum = sum + basket[i].lot.currentPrice;
      } else {
        sum = sum + basket[i].book.price;
      }
    }
    res.render("booksPurchased.hbs", {
      Baskets: basket,
      User: req.user,
      Sum: sum,
    });
  });
};
exports.getPutAuction = function (req, res) {
  var iduser = parseInt(req.user.idUser);
  var Books = models.books;
  var Lots = models.lots;
  var PhotoBooks = models.photoBooks;
  Books.findAll({
    where: {
      show: true,
      idUser: iduser,
      $and: sequelize.literal(`idLot IS NULL`),
    },
    include: [Lots, PhotoBooks],
  }).then((book) => {
    res.render("putAuction.hbs", {
      User: req.user,
      Books: book,
    });
  });
};
exports.postPutAuction = function (req, res) {
  var idbook = req.body.idbook;
  var createStartDate = req.body.startDate;
  var createEndDate = req.body.endDate;
  var createMinRate;

  var Lots = models.lots;
  var Books = models.books;
  Books.findOne({ where: { idBook: idbook } }).then((book) => {
    if (req.body.minRate) {
      createMinRate = req.body.minRate;
    } else {
      createMinRate = book.price * 0.1;
    }
    Lots.create({
      idBook: idbook,
      numberOfBets: 0,
      startDate: createStartDate,
      endDate: createEndDate,
      minRate: createMinRate,
      currentPrice: book.price,
    }).then(() => {
      res.send("Книга выставлена на аукцион! :-)");
    });
  });
};
exports.getDeliveryMethod = function (req, res) {
  /**способ доставки*/
  var iduser = parseInt(req.user.idUser);
  var DeliveryMethod = models.DeliveryMethods;
  var Books = models.books;
  var PhotoBooks = models.photoBooks;
  DeliveryMethod.findAll({}).then((dm) => {
    Books.findAll({
      where: {
        show: true,
        idUser: iduser,
      },
      include: PhotoBooks,
    }).then((book) => {
      res.render("partials/deliveryMethod.hbs", {
        User: req.user,
        Books: book,
        DeliveryMethod: dm,
      });
    });
  });
};
exports.postDeliveryMethod = function (req, res) {
  /**способ доставки*/
  var iduser = parseInt(req.user.idUser);
  var createDeliveryMethod = req.body.deliveryMethods;
  var all = req.body.all;
  var Users = models.users;
  var Sellers = models.sellers;
  var SellerDeliveries = models.SellerDeliveries;
  var BookDeliveries = models.BookDeliveries;
  var Books = models.books;

  Sellers.findOne({
    include: [{ model: Users, where: { idUser: iduser } }],
  }).then((seller) => {
    if (all) {
      //для всех
      Books.findAll({
        where: {
          idUser: seller.user.idUser,
        },
      }).then((book) => {
        for (var i = 0; i < createDeliveryMethod.length; i++) {
          SellerDeliveries.destroy({
            where: {
              idSeller: seller.idSeller,
              idDelivery: createDeliveryMethod[i],
            },
          });
          SellerDeliveries.create({
            idSeller: seller.idSeller,
            idDelivery: createDeliveryMethod[i],
          });
        }
        for (var i = 0; i < createDeliveryMethod.length; i++) {
          for (var i = 0; i < book.length; i++) {
            BookDeliveries.destroy({
              where: {
                idBook: book[i].idBook,
                idDelivery: createDeliveryMethod[i],
              },
            });
            BookDeliveries.create({
              idBook: book[i].idBook,
              idDelivery: createDeliveryMethod[i],
            });
          }
        }
      });
    } else {
      //для одной книги
      var idbook = req.body.idbook;
      for (var i = 0; i < createDeliveryMethod.length; i++) {
        BookDeliveries.destroy({
          where: {
            idBook: idbook,
            idDelivery: createDeliveryMethod[i],
          },
        });
        BookDeliveries.create({
          idBook: idbook,
          idDelivery: createDeliveryMethod[i],
        });
        SellerDeliveries.destroy({
          where: {
            idSeller: seller.idSeller,
            idDelivery: createDeliveryMethod[i],
          },
        });
        SellerDeliveries.create({
          idSeller: seller.idSeller,
          idDelivery: createDeliveryMethod[i],
        });
      }
    }
  });
};
exports.getPaymentMethod = function (req, res) {
  /**способ оплаты*/
  var iduser = parseInt(req.user.idUser);
  var PaymentMethod = models.PaymentMethods;
  var Books = models.books;
  var PhotoBooks = models.photoBooks;
  PaymentMethod.findAll({}).then((pm) => {
    Books.findAll({
      where: {
        show: true,
        idUser: iduser,
      },
      include: PhotoBooks,
    }).then((book) => {
      res.render("partials/paymentMethod.hbs", {
        User: req.user,
        Books: book,
        PaymentMethod: pm,
      });
    });
  });
};
exports.postPaymentMethod = function (req, res) {
  /**способ оплаты*/
  var iduser = parseInt(req.user.idUser);
  var Users = models.users;
  var Sellers = models.sellers;
  var createPaymentMethod = req.body.paymentMethods;
  var all = req.body.all;
  var SellerPayments = models.SellerPayments;
  var BookPayments = models.BookPayments;
  var Books = models.books;

  Sellers.findOne({
    include: [{ model: Users, where: { idUser: iduser } }],
  }).then((seller) => {
    var idSeller = seller.idSeller;
    if (all) {
      //для всех
      Books.findAll({
        where: { idUser: seller.user.idUser },
      }).then((book) => {
        for (var i = 0; i < createPaymentMethod.length; i++) {
          SellerPayments.destroy({
            where: {
              idSeller: seller.idSeller,
              idPayment: createPaymentMethod[i],
            },
          });
          SellerPayments.create({
            idSeller: seller.idSeller,
            idPayment: createPaymentMethod[i],
          });
        }
        for (var i = 0; i < createPaymentMethod.length; i++) {
          for (var i = 0; i < book.length; i++) {
            BookPayments.destroy({
              where: {
                idBook: book[i].idBook,
                idPayment: createPaymentMethod[i],
              },
            });
            BookPayments.create({
              idBook: book[i].idBook,
              idPayment: createPaymentMethod[i],
            });
          }
        }
      });
    } else {
      //для одной книги
      var idbook = req.body.idbook;
      for (var i = 0; i < createPaymentMethod.length; i++) {
        BookPayments.destroy({
          where: {
            idBook: idbook,
            idPayment: createPaymentMethod[i],
          },
        });
        BookPayments.create({
          idBook: idbook,
          idPayment: createPaymentMethod[i],
        });
        SellerPayments.destroy({
          where: {
            idSeller: seller.idSeller,
            idPayment: createPaymentMethod[i],
          },
        });
        SellerPayments.create({
          idSeller: seller.idSeller,
          idPayment: createPaymentMethod[i],
        });
      }
    }
  });
};
exports.getMyPlaceInTheTop = function (req, res) {
  var Users = models.users;
  var Sellers = models.sellers;
  var Top = models.top;
  Top.findAll({
    include: [{ model: Users, include: Sellers }],
    order: [["place", "ASC"]],
  }).then((top) => {
    Top.findOne({
      include: [
        { model: Users, where: { idUser: req.user.idUser }, include: Sellers },
      ],
    }).then((userTop) => {
      res.render("topSellers.hbs", {
        Top: top,
        UserTop: userTop,
        User: req.user,
      });
    });
  });
};
exports.getMyDiscount = function (req, res) {
  var id = parseInt(req.user.idUser);
  var User = models.users;
  var Top = models.top;
  var DiscountSystem = models.discountSystem;
  Top.findOne({ where: { idSeller: id } }).then((top) => {
    DiscountSystem.findOne({
      where: {
        $and: sequelize.literal(
          `(minPlace < ` +
            top.place +
            ` AND maxPlace > ` +
            top.place +
            `) OR minPlace = ` +
            top.place +
            ` OR maxPlace = ` +
            top.place
        ),
      },
    }).then((discont) => {
      DiscountSystem.findAll({ order: [["minPlace", "ASC"]] }).then(
        (Disconts) => {
          res.render("partials/myDiscount.hbs", {
            Top: top,
            Discount: discont,
            DiscountSystem: Disconts,
            User: req.user,
          });
        }
      );
    });
  });
};
exports.postSubscribe = function (req, res) {
  var iduser = parseInt(req.user.idUser);
  var idgenre = req.body.idgenre;
  var Subscriptions = models.subscriptions;
  Subscriptions.count({
    where: {
      idUser: iduser,
      idGenre: idgenre,
    },
  }).then((count) => {
    if (count) {
      //подписка уже есть
      res.send("Вы Молодец! Уже подписаны! :-)");
    } else {
      //добавление подписки
      Subscriptions.create({
        idUser: iduser,
        idGenre: idgenre,
      }).then(() => {
        res.send(
          "Ура!!! Теперь вы подписаны. Когда кто-то выставит книгу, этого жанра, вам прийдет собщение. Проверяёте свои сообщения. :-)"
        );
      });
    }
  });
};
exports.getMySubscriptions = function (req, res) {
  var iduser = parseInt(req.user.idUser);
  var Subscriptions = models.subscriptions;
  var Genres = models.genres;
  Subscriptions.findAll({ where: { idUser: iduser }, include: Genres }).then(
    (subscriptions) => {
      res.render("mySubscriptions.hbs", {
        Subscriptions: subscriptions,
        User: req.user,
      });
    }
  );
};
exports.postMySubscriptions = function (req, res) {
  var iduser = parseInt(req.user.idUser);
  var idsubscriptions = req.body.idsubscriptions;
  var Subscriptions = models.subscriptions;
  var Genres = models.genres;
  Subscriptions.destroy({
    where: {
      idSubscriptions: idsubscriptions,
    },
  }).then(() => {
    Subscriptions.findAll({ where: { idUser: iduser }, include: Genres }).then(
      (subscriptions) => {
        res.render("mySubscriptions.hbs", {
          Subscriptions: subscriptions,
          User: req.user,
        });
      }
    );
  });
};
exports.postUserWarnings = function (req, res) {
  var iduser = req.body.iduser;
  var Warnings = models.warnings;
  Warnings.findAll({ where: { idUser: iduser } }).then((warnings) => {
    res.render("partials/userWarnings", {
      Warnings: warnings,
      User: req.user,
    });
  });
};

//добавление Жанра
exports.getCreateGenre = function (req, res) {
  res.render("crete.hbs", {
    url: "Genre",
    heder: "Добавить жанр",
    textOne: "Жанр",
  });
};
exports.postCreateGenre = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var iduser = parseInt(req.user.idUser);
  var Genres = models.genres;
  const Createrule = req.body.textOne;
  const id = req.body.id;

  Genres.count({ where: { title: Createrule } }).then((count) => {
    if (count == 0) {
      //таких нет
      //создание
      Genres.create({ title: Createrule, added: false, idUser: iduser })
        .then((genre) => {
          var json = {
            title: genre.title,
            id: genre.idGenre,
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
exports.getCreatePublisher = function (req, res) {
  res.render("crete.hbs", {
    url: "Publisher",
    heder: "Добавить издательство",
    textOne: "Издательство",
  });
};
exports.postCreatePublisher = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var iduser = parseInt(req.user.idUser);
  var Publishers = models.publishers;
  const Createtitle = req.body.textOne;
  const id = req.body.id;

  Publishers.count({
    where: { title: Createtitle },
  }).then((count) => {
    if (count == 0) {
      //таких нет
      //создание
      Publishers.create({ title: Createtitle, added: false, idUser: iduser })
        .then((publisher) => {
          var json = {
            title: publisher.title,
            id: publisher.idPublisher,
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
