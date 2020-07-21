module.exports = function (sequelize, Sequelize) {
  //Подписки
  const Subscriptions = sequelize.define("subscriptions", {
    idSubscriptions: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });

  return Subscriptions;
};
