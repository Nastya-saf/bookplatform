module.exports = function (sequelize, Sequelize) {
  /**способ оплаты*/
  const PaymentMethods = sequelize.define("PaymentMethods", {
    idPayment: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
  });
  return PaymentMethods;
};
