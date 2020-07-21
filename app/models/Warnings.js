module.exports = function (sequelize, Sequelize) {
  const Warnings = sequelize.define("warnings", {
    idWarning: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return Warnings;
};
