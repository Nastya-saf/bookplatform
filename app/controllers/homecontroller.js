var models = require("../models");
const sequelize = require("sequelize");

exports.home = function (req, res) {
  var Lots = models.lots;
  var PhotoBooks = models.photoBooks;
  var ProductGroups = models.productGroups;
  var Authors = models.authors;
  var Users = models.users;
  var Genres = models.genres;
  var Books = models.books;
  var Publishers = models.publishers;
  Genres.findAll({ order: [["title", "ASC"]] })
    .then((genres) => {
      Books.findAll({
        where: {
          delete: false,
          paid: true,
          show: true,
          bought: false,
        },
        include: [Lots, PhotoBooks, ProductGroups, Authors, Genres, Publishers],
        order: [["price", "ASC"]],
      }).then((books) => {
        Users.findAll({ raw: true }).then((users) => {
          Authors.findAll({ order: [["lastName", "ASC"]] }).then((authors) => {
            Publishers.findAll({ order: [["title", "ASC"]] }).then(
              (publishers) => {
                res.render("index.hbs", {
                  Genres: genres,
                  Books: books,
                  Users: users,
                  Authors: authors,
                  Publishers: publishers,
                  User: req.user,
                });
              }
            );
          });
        });
      });
    })
    .catch((err) => console.log(err));
};
exports.seach = function (req, res) {
  const search = req.body.search;
  const tgenre = req.body.genre;
  var yearOfPublishingFrom = parseInt(req.body.yearOfPublishingFrom);
  const yearOfPublishingBefore = parseInt(req.body.yearOfPublishingBefore);
  const type = req.body.sorting;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const auction = req.body.auction;

  var Lots = models.lots;
  var Authors = models.authors;
  var Publishers = models.publishers;
  var Genres = models.genres;
  var BookAuthors = models.BookAuthors;
  var BookGenres = models.BookGenres;
  var Books = models.books;
  var PhotoBooks = models.photoBooks;

  if (!yearOfPublishingFrom) {
    yearOfPublishingFrom = 0;
  }
  let query = { where: {}, order: [["price", type]] };
  if (yearOfPublishingBefore) {
    queryYear =
      `[books].[yearOfPublishing]>=` +
      yearOfPublishingFrom +
      ` AND [books].[yearOfPublishing]<=` +
      yearOfPublishingBefore +
      ``;
  }
  if (search) {
    querySearch =
      `(CONTAINS ([books].[title], N'"*` +
      search +
      `*"') OR CONTAINS ([books].[annotation], N'"*` +
      search +
      `*"') OR CONTAINS ([books].[description], N'"*` +
      search +
      `*"')
    OR CONTAINS ([genres].[title], N'"*` +
      search +
      `*"') OR CONTAINS ([authors].[lastName], N'"*` +
      search +
      `*"') OR CONTAINS ([authors].[name], N'"*` +
      search +
      `*"')
    OR CONTAINS ([authors].[patronymic], N'"*` +
      search +
      `*"') OR CONTAINS ([authors].[biography], N'"*` +
      search +
      `*"') OR CONTAINS ([publisher].[title], N'"*` +
      search +
      `*"'))`;
  }
  if (!tgenre) {
    if (!yearOfPublishingBefore) {
      if (search) {
        if (!publisher) {
          if (!author) {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                ],
              };
            } else {
              query = {
                where: {
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: Lots },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                ],
              };
            }
          } else {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                ],
              };
            }
          }
        } else {
          if (!author) {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                ],
              };
            }
          } else {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                ],
              };
            }
          }
        }
      } else {
        if (!publisher) {
          if (!author) {
            if (auction) {
              query = {
                where: { delete: true },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: { delete: true },
                order: [["arrivalTime", type]],
                include: [Lots, PhotoBooks, Authors],
              };
            }
          } else {
            if (auction) {
              query = {
                where: { delete: true },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: { delete: true },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          }
        } else {
          if (!author) {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                },
                order: [["arrivalTime", type]],
                include: [Lots, PhotoBooks, Authors],
              };
            }
          } else {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          }
        }
      }
    }
    if (yearOfPublishingBefore) {
      if (search) {
        if (!publisher) {
          if (!author) {
            if (auction) {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          } else {
            if (auction) {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          }
        } else {
          if (!author) {
            if (auction) {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          } else {
            if (auction) {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          }
        }
      } else {
        if (!publisher) {
          if (!author) {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [Lots, PhotoBooks, Authors],
              };
            }
          } else {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          }
        } else {
          if (!author) {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [Lots, PhotoBooks, Authors],
              };
            }
          } else {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          }
        }
      }
    }
  }
  if (tgenre) {
    if (yearOfPublishingBefore) {
      if (search) {
        if (!publisher) {
          if (!author) {
            if (auction) {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          } else {
            if (auction) {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          }
        } else {
          if (!author) {
            if (auction) {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          } else {
            if (auction) {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              let que = querySearch + " AND " + queryYear;
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(que),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          }
        }
      } else {
        if (!publisher) {
          if (!author) {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          } else {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          }
        } else {
          if (!author) {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          } else {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(queryYear),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          }
        }
      }
    }
    if (!yearOfPublishingBefore) {
      if (search) {
        if (!publisher) {
          if (!author) {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          } else {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          }
        } else {
          if (!author) {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          } else {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: PhotoBooks },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                  $and: sequelize.literal(querySearch),
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Authors },
                  { model: Publishers },
                  { model: Genres },
                  { model: Lots },
                  { model: PhotoBooks },
                ],
              };
            }
          }
        }
      } else {
        if (!publisher) {
          if (!author) {
            if (auction) {
              query = {
                where: { delete: true },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {},
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          } else {
            if (auction) {
              query = {
                where: { delete: true },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: { delete: true },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          }
        } else {
          if (!author) {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          } else {
            if (auction) {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                },
                order: [["arrivalTime", type]],
                include: [
                  {
                    model: Lots,
                    required: true,
                  },
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            } else {
              query = {
                where: {
                  delete: false,
                  paid: true,
                  show: true,
                  bought: false,
                  idPublisher: publisher,
                },
                order: [["arrivalTime", type]],
                include: [
                  { model: BookGenres, where: { idGenre: tgenre } },
                  { model: BookAuthors, where: { idAuthor: author } },
                  { model: Lots },
                  { model: PhotoBooks },
                  { model: Authors },
                ],
              };
            }
          }
        }
      }
    }
  }

  Books.findAll(query).then((Books) => {
    res.render("partials/bookList.hbs", {
      Books: Books,
    });
  });
};
exports.seller = function (req, res) {
  var Users = models.users;
  var Sellers = models.sellers;
  const iduser = req.params.iduser;
  var Comments = models.comments;
  Users.findOne({ where: { idUser: iduser }, include: Sellers }).then(
    (user) => {
      Comments.findAll({
        where: { idSeller: iduser },
        order: [["idReview", "DESC"]],
      }).then((Comment) => {
        res.render("seller.hbs", {
          Users: user,
          Comments: Comment,
          User: req.user,
        });
      });
    }
  );
};
exports.glossary = function (req, res) {
  var Glossary = models.glossary;
  Glossary.findAll({}).then((Glossary) => {
    res.render("glossary.hbs", {
      Glossary: Glossary,
      User: req.user,
    });
  });
};
exports.regulation = function (req, res) {
  var Regulations = models.regulations;
  Regulations.findAll({}).then((Regulation) => {
    res.render("regulations.hbs", {
      Regulations: Regulation,
      User: req.user,
    });
  });
};
exports.topSellers = function (req, res) {
  var Users = models.users;
  var Sellers = models.sellers;
  var Top = models.top;
  Top.findAll({
    include: [{ model: Users, include: Sellers }],
    order: [["place", "ASC"]],
  }).then((top) => {
    res.render("topSellers.hbs", {
      Top: top,
      User: req.user,
    });
  });
};
exports.sellersList = function (req, res) {
  var Users = models.users;
  var Sellers = models.sellers;
  Sellers.findAll({
    include: Users,
  }).then((Seller) => {
    res.render("sellersList.hbs", {
      Sellers: Seller,
      User: req.user,
    });
  });
};
exports.getcommetsSeller = function (req, res) {
  res.render("commetsSeller.hbs", {
    User: req.user,
  });
};
exports.postcommetsSeller = function (req, res) {
  const idseller = req.params.idseller;
  const idbuyer = req.user.idUser;
  var createComment = req.body.comment;
  var createTypesOfReviews = req.body.TypesOfReviews;
  var Comments = models.comments;
  var nowDate = new Date();
  Comments.create({
    comment: createComment,
    typesOfReviews: createTypesOfReviews,
    idSeller: idseller,
    idBuyer: idbuyer,
  })
    .then(() => {
      res.send("/seller/" + idseller);
    })
    .catch((err) => console.log(err));
};

exports.menuSeach = function (req, res) {
  const search = req.params.search;
  var Lots = models.lots;
  var Authors = models.authors;
  var Publishers = models.publishers;
  var Genres = models.genres;
  var BookAuthors = models.BookAuthors;
  var BookGenres = models.BookGenres;
  var Books = models.books;
  var PhotoBooks = models.photoBooks;
  var ProductGroups = models.productGroups;
  var Users = models.users;

  querySearch =
    `(CONTAINS ([books].[title], N'"*` +
    search +
    `*"') OR CONTAINS ([books].[annotation], N'"*` +
    search +
    `*"') OR CONTAINS ([books].[description], N'"*` +
    search +
    `*"')
    OR CONTAINS ([genres].[title], N'"*` +
    search +
    `*"') OR CONTAINS ([authors].[lastName], N'"*` +
    search +
    `*"') OR CONTAINS ([authors].[name], N'"*` +
    search +
    `*"')
    OR CONTAINS ([authors].[patronymic], N'"*` +
    search +
    `*"') OR CONTAINS ([authors].[biography], N'"*` +
    search +
    `*"') OR CONTAINS ([publisher].[title], N'"*` +
    search +
    `*"'))`;
  Genres.findAll({ order: [["title", "ASC"]] })
    .then((genres) => {
      Books.findAll({
        where: {
          delete: false,
          paid: true,
          show: true,
          bought: false,
          $and: sequelize.literal(querySearch),
        },
        order: [["price", "ASC"]],
        include: [Lots, PhotoBooks, ProductGroups, Authors, Genres, Publishers],
      }).then((books) => {
        Users.findAll({ raw: true }).then((users) => {
          Authors.findAll({ order: [["lastName", "ASC"]] }).then((authors) => {
            Publishers.findAll({ order: [["title", "ASC"]] }).then(
              (publishers) => {
                res.render("index.hbs", {
                  Genres: genres,
                  Books: books,
                  Users: users,
                  Authors: authors,
                  Publishers: publishers,
                  User: req.user,
                  homeSearch: search,
                });
              }
            );
          });
        });
      });
    })
    .catch((err) => console.log(err));
};
