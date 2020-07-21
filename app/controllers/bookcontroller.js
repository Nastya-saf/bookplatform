var models = require("../models");
const sequelize = require("sequelize");

exports.book = function (req, res) {
  var Genres = models.genres;
  var BookGenres = models.BookGenres;
  var Books = models.books;
  var States = models.states;
  var Publishers = models.publishers;
  var Authors = models.authors;
  var BookAuthors = models.BookAuthors;
  var TypesOfBindings = models.typesOfBindings;
  var ProductGroups = models.productGroups;
  var PhotoBooks = models.photoBooks;
  var Lots = models.lots;
  var PaymentMethods = models.PaymentMethods;
  var DeliveryMethods = models.DeliveryMethods;
  var InformationDeliveries = models.InformationDeliveries;
  var Users = models.users;
  const Booksid = req.params.idBook;
  Books.findAll({
    where: {
      delete: false,
      paid: true,
      show: true,
      bought: false,
      idBook: Booksid,
    },
    include: [
      States,
      Publishers,
      TypesOfBindings,
      ProductGroups,
      PhotoBooks,
      Lots,
      PaymentMethods,
      DeliveryMethods,
      InformationDeliveries,
      Users,
    ],
  })
    .then((Book) => {
      BookGenres.findAll({
        where: { idBook: Booksid },
        include: [{ model: Genres, order: [["title", "ASC"]] }, Books],
      }).then((Genre) => {
        BookAuthors.findAll({
          where: { idBook: Booksid },
          include: [{ model: Authors, order: [["lastName", "ASC"]] }, Books],
        }).then((Author) => {
          res.render("book.hbs", {
            Books: Book[0],
            Genres: Genre,
            Authors: Author,
            User: req.user,
          });
        });
      });
    })
    .catch((err) => console.log(err));
};
