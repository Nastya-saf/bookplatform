module.exports = function(sequelize, Sequelize) {
  /**цена за книгу*/
  const PriceBook = sequelize.define("priceBook", {
    idPrice: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
  return PriceBook;
};
