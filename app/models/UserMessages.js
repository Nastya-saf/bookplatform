module.exports = function (sequelize, Sequelize) {
  /**сообщения пользователя*/
  const UserMessages = sequelize.define("userMessages", {
    idMessage: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    read: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return UserMessages;
};
