module.exports = function (sequelize, Sequelize) {
  const BookPayments = sequelize.define("BookPayments", {
    idBP: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    selected: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return BookPayments;
};
