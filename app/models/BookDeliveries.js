module.exports = function (sequelize, Sequelize) {
  const BookDeliveries = sequelize.define("BookDeliveries", {
    idBD: {
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

  return BookDeliveries;
};
