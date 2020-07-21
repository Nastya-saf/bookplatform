module.exports = function (sequelize, Sequelize) {
  const SellerPayments = sequelize.define("SellerPayments", {
    idSP: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });

  return SellerPayments;
};
