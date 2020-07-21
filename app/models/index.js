"use strict";

var Sequelize = require("sequelize");
var models = require("./indexHelp");

models.books.hasMany(models.photoBooks, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.photoBooks.belongsTo(models.books, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.publishers.hasMany(models.books, {
  as: "BookPublisher",
  foreignKey: "idPublisher",
  sourceKey: "idPublisher",
});
models.books.belongsTo(models.publishers, {
  foreignKey: "idPublisher",
  sourceKey: "idPublisher",
});
models.users.hasMany(models.publishers, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.publishers.belongsTo(models.users, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.states.hasMany(models.books, {
  foreignKey: "idState",
  sourceKey: "idState",
});
models.books.belongsTo(models.states, {
  foreignKey: "idState",
  sourceKey: "idState",
});
models.productGroups.hasMany(models.books, {
  foreignKey: "idGroup",
  sourceKey: "idGroup",
});
models.books.belongsTo(models.productGroups, {
  foreignKey: "idGroup",
  sourceKey: "idGroup",
});
models.typesOfBindings.hasMany(models.books, {
  foreignKey: "idBinding",
  sourceKey: "idBinding",
});
models.books.belongsTo(models.typesOfBindings, {
  foreignKey: "idBinding",
  sourceKey: "idBinding",
});
models.users.hasMany(models.books, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.books.belongsTo(models.users, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.users.hasMany(models.top, {
  foreignKey: "idSeller",
  sourceKey: "idUser",
});
models.top.belongsTo(models.users, {
  foreignKey: "idSeller",
  sourceKey: "idUser",
});
models.users.hasMany(models.warnings, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.warnings.belongsTo(models.users, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.users.hasMany(models.comments, {
  foreignKey: "idSeller",
  sourceKey: "idUser",
});
models.comments.belongsTo(models.users, {
  foreignKey: "idSeller",
  sourceKey: "idUser",
});
models.users.hasMany(models.comments, {
  foreignKey: "idBuyer",
  sourceKey: "idUser",
});
models.comments.belongsTo(models.users, {
  foreignKey: "idBuyer",
  sourceKey: "idUser",
});
models.lots.hasMany(models.auctions, {
  foreignKey: "idLot",
  sourceKey: "idLot",
});
models.auctions.belongsTo(models.lots, {
  foreignKey: "idLot",
  sourceKey: "idLot",
});
models.users.hasMany(models.auctions, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.auctions.belongsTo(models.users, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.users.hasMany(models.userMessages, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.userMessages.belongsTo(models.users, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.users.hasMany(models.blackList, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.users.hasMany(models.commentSite, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.commentSite.belongsTo(models.users, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.discountSystem.hasMany(models.priceBook, {
  foreignKey: "idDiscount",
  sourceKey: "idDiscount",
});
models.users.hasOne(models.priceBook, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.sellers.hasOne(models.users, {
  foreignKey: "idSeller",
  sourceKey: "idSeller",
});
models.users.belongsTo(models.sellers, {
  foreignKey: "idSeller",
  sourceKey: "idSeller",
});
models.buyers.hasOne(models.users, {
  foreignKey: "idBuyer",
  sourceKey: "idBuyer",
});
models.users.belongsTo(models.buyers, {
  foreignKey: "idBuyer",
  sourceKey: "idBuyer",
});
models.users.hasMany(models.baskets, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.baskets.belongsTo(models.users, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.books.hasMany(models.baskets, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.baskets.belongsTo(models.books, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.lots.hasMany(models.baskets, {
  foreignKey: "idLot",
  sourceKey: "idLot",
});
models.baskets.belongsTo(models.lots, {
  foreignKey: "idLot",
  sourceKey: "idLot",
});
models.baskets.hasOne(models.orders, {
  foreignKey: "idBasket",
  sourceKey: "idBasket",
});
models.orders.belongsTo(models.baskets, {
  foreignKey: "idBasket",
  sourceKey: "idBasket",
});
models.users.hasMany(models.lots, {
  foreignKey: "idLeader",
  sourceKey: "idUser",
});
models.lots.belongsTo(models.users, {
  foreignKey: "idLeader",
  sourceKey: "idUser",
});
models.books.hasOne(models.lots, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.lots.belongsTo(models.books, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});

models.books.belongsToMany(models.genres, {
  through: models.BookGenres,
  foreignKey: "idBook",
});
models.genres.belongsToMany(models.books, {
  through: models.BookGenres,
  foreignKey: "idGenre",
});
models.books.hasMany(models.BookGenres, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.BookGenres.belongsTo(models.books, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.genres.hasMany(models.BookGenres, {
  foreignKey: "idGenre",
  sourceKey: "idGenre",
});
models.BookGenres.belongsTo(models.genres, {
  foreignKey: "idGenre",
  sourceKey: "idGenre",
});
models.books.belongsToMany(models.authors, {
  through: models.BookAuthors,
  foreignKey: "idBook",
});
models.authors.belongsToMany(models.books, {
  through: models.BookAuthors,
  foreignKey: "idAuthor",
});
models.books.hasMany(models.BookAuthors, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.BookAuthors.belongsTo(models.books, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.authors.hasMany(models.BookAuthors, {
  foreignKey: "idAuthor",
  sourceKey: "idAuthor",
});
models.BookAuthors.belongsTo(models.authors, {
  foreignKey: "idAuthor",
  sourceKey: "idAuthor",
});
models.users.hasMany(models.authors, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.authors.belongsTo(models.users, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.books.belongsToMany(models.DeliveryMethods, {
  through: models.BookDeliveries,
  foreignKey: "idBook",
});
models.DeliveryMethods.belongsToMany(models.books, {
  through: models.BookDeliveries,
  foreignKey: "idDelivery",
});
models.books.hasMany(models.BookDeliveries, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.BookDeliveries.belongsTo(models.books, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.DeliveryMethods.hasMany(models.BookDeliveries, {
  foreignKey: "idDelivery",
  sourceKey: "idDelivery",
});
models.BookDeliveries.belongsTo(models.DeliveryMethods, {
  foreignKey: "idDelivery",
  sourceKey: "idDelivery",
});
models.books.belongsToMany(models.PaymentMethods, {
  through: models.BookPayments,
  foreignKey: "idBook",
});
models.PaymentMethods.belongsToMany(models.books, {
  through: models.BookPayments,
  foreignKey: "idPayment",
});
models.books.hasMany(models.BookPayments, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.BookPayments.belongsTo(models.books, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.PaymentMethods.hasMany(models.BookPayments, {
  foreignKey: "idPayment",
  sourceKey: "idPayment",
});
models.BookPayments.belongsTo(models.PaymentMethods, {
  foreignKey: "idPayment",
  sourceKey: "idPayment",
});
models.books.belongsToMany(models.InformationDeliveries, {
  through: models.BookInformations,
  foreignKey: "idBook",
});
models.InformationDeliveries.belongsToMany(models.books, {
  through: models.BookInformations,
  foreignKey: "idInformation",
});
models.books.hasMany(models.BookInformations, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.BookInformations.belongsTo(models.books, {
  foreignKey: "idBook",
  sourceKey: "idBook",
});
models.InformationDeliveries.hasMany(models.BookInformations, {
  foreignKey: "idInformation",
  sourceKey: "idInformation",
});
models.BookInformations.belongsTo(models.InformationDeliveries, {
  foreignKey: "idInformation",
  sourceKey: "idInformation",
});
models.sellers.belongsToMany(models.DeliveryMethods, {
  through: models.SellerDeliveries,
  foreignKey: "idSeller",
});
models.DeliveryMethods.belongsToMany(models.sellers, {
  through: models.SellerDeliveries,
  foreignKey: "idDelivery",
});
models.sellers.hasMany(models.SellerDeliveries, {
  foreignKey: "idSeller",
  sourceKey: "idSeller",
});
models.SellerDeliveries.belongsTo(models.sellers, {
  foreignKey: "idSeller",
  sourceKey: "idSeller",
});
models.DeliveryMethods.hasMany(models.SellerDeliveries, {
  foreignKey: "idDelivery",
  sourceKey: "idDelivery",
});
models.SellerDeliveries.belongsTo(models.DeliveryMethods, {
  foreignKey: "idDelivery",
  sourceKey: "idDelivery",
});
models.sellers.belongsToMany(models.PaymentMethods, {
  through: models.SellerPayments,
  foreignKey: "idSeller",
});
models.PaymentMethods.belongsToMany(models.sellers, {
  through: models.SellerPayments,
  foreignKey: "idPayment",
});
models.sellers.hasMany(models.SellerPayments, {
  foreignKey: "idSeller",
  sourceKey: "idSeller",
});
models.SellerPayments.belongsTo(models.sellers, {
  foreignKey: "idSeller",
  sourceKey: "idSeller",
});
models.PaymentMethods.hasMany(models.SellerPayments, {
  foreignKey: "idPayment",
  sourceKey: "idPayment",
});
models.SellerPayments.belongsTo(models.PaymentMethods, {
  foreignKey: "idPayment",
  sourceKey: "idPayment",
});
models.sellers.belongsToMany(models.InformationDeliveries, {
  through: models.SellerInformations,
  foreignKey: "idSeller",
});
models.InformationDeliveries.belongsToMany(models.sellers, {
  through: models.SellerInformations,
  foreignKey: "idInformation",
});
models.sellers.hasMany(models.SellerInformations, {
  foreignKey: "idSeller",
  sourceKey: "idSeller",
});
models.SellerInformations.belongsTo(models.sellers, {
  foreignKey: "idSeller",
  sourceKey: "idSeller",
});
models.InformationDeliveries.hasMany(models.SellerInformations, {
  foreignKey: "idInformation",
  sourceKey: "idInformation",
});
models.SellerInformations.belongsTo(models.InformationDeliveries, {
  foreignKey: "idInformation",
  sourceKey: "idInformation",
});
models.users.belongsToMany(models.genres, {
  through: models.subscriptions,
  foreignKey: "idUser",
});
models.genres.belongsToMany(models.users, {
  through: models.subscriptions,
  foreignKey: "idGenre",
});
models.users.hasMany(models.subscriptions, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.subscriptions.belongsTo(models.users, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.genres.hasMany(models.subscriptions, {
  foreignKey: "idGenre",
  sourceKey: "idGenre",
});
models.subscriptions.belongsTo(models.genres, {
  foreignKey: "idGenre",
  sourceKey: "idGenre",
});
models.users.hasMany(models.genres, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
models.genres.belongsTo(models.users, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});

module.exports = models;
