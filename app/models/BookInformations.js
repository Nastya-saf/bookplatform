module.exports = function (sequelize, Sequelize) {
  const BookInformations = sequelize.define("BookInformations", {
    idBI: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });

  return BookInformations;
};
