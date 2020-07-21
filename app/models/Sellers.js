module.exports = function (sequelize, Sequelize) {
  /**продавцы*/
  const Sellers = sequelize.define("sellers", {
    idSeller: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    InformationAdditional: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    region: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    postcode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telephone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numberOfSales: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    numberOfBooks: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  });
  return Sellers;
};
