module.exports = function (sequelize, Sequelize) {
  /**состояния*/
  const States = sequelize.define("states", {
    idState: {
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
  return States;
};
