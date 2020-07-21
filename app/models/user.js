module.exports = function (sequelize, Sequelize) {
  /**пользователи*/
  const Users = sequelize.define("users", {
    idUser: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING(2047),
      allowNull: true,
    },
    monthlyFee: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    numberWarnings: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return Users;
};
