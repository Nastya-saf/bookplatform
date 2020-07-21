module.exports = function(sequelize, Sequelize) {
  /**заказы*/
  const Orders = sequelize.define("orders", {
    idOrder: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    getting: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });
  return Orders;
};
