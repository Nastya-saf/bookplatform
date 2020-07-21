module.exports = function (sequelize, Sequelize) {
  /**корзины*/
  const Baskets = sequelize.define("baskets", {
    idBasket: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    renouncement: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return Baskets;
};
