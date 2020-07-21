module.exports = function (sequelize, Sequelize) {
  /**система скидок*/
  const DiscountSystem = sequelize.define("discountSystem", {
    idDiscount: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    discountPercentage: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    minPlace: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    maxPlace: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return DiscountSystem;
};
