module.exports = function (sequelize, Sequelize) {
  /**способ доставки*/
  const DeliveryMethods = sequelize.define("DeliveryMethods", {
    idDelivery: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(2047),
      allowNull: false,
    },
  });
  return DeliveryMethods;
};
