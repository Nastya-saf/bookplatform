module.exports = function (sequelize, Sequelize) {
  /**товарные группы*/
  const ProductGroups = sequelize.define("productGroups", {
    idGroup: {
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
  return ProductGroups;
};
