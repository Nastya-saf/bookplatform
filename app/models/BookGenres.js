module.exports = function (sequelize, Sequelize) {
  const BookGenres = sequelize.define("BookGenres", {
    idBG: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });
  return BookGenres;
};
