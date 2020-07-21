module.exports = function (sequelize, Sequelize) {
  /**покупатели*/
  const Buyers = sequelize.define("buyers", {
    idBuyer: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING(2047),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(2047),
      allowNull: false,
    },
    patronymic: {
      type: Sequelize.STRING(2047),
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING(1023),
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(1023),
      allowNull: true,
    },
    postcode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    telephone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return Buyers;
};
