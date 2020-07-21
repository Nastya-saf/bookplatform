module.exports = function (sequelize, Sequelize) {
  /**типы переплетов*/
  const TypesOfBindings = sequelize.define("typesOfBindings", {
    idBinding: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(511),
      allowNull: false,
    },
  });
  return TypesOfBindings;
};
