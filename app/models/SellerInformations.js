module.exports = function (sequelize, Sequelize) {
  const SellerInformations = sequelize.define("SellerInformations", {
    idSI: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });

  return SellerInformations;
};
