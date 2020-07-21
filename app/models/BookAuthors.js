module.exports = function (sequelize, Sequelize) {
  const BookAuthors = sequelize.define("BookAuthors", {
    idBA: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });

  return BookAuthors;
};
