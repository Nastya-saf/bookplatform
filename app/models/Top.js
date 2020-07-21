module.exports = function (sequelize, Sequelize) {
  /**Топ*/
  const Top = sequelize.define("top", {
    idTop: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    place: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Top;
};
