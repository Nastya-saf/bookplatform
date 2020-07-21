module.exports = function (sequelize, Sequelize) {
  const SellerDeliveries = sequelize.define("SellerDeliveries", {
    idSD: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });

  return SellerDeliveries;
};
