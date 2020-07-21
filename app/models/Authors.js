module.exports = function (sequelize, Sequelize) {
  /**авторы*/
  const Authors = sequelize.define("authors", {
    idAuthor: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    patronymic: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    dateOfDeath: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    biography: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    photo: {
      type: Sequelize.STRING(1023),
      allowNull: true,
    },
    added: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return Authors;
};
