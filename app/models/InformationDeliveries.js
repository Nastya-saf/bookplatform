module.exports = function (sequelize, Sequelize) {
  /**информация о доставке*/
  const InformationDeliveries = sequelize.define("InformationDeliveries", {
    idInformation: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
  });
  return InformationDeliveries;
};
