module.exports = function (sequelize, Sequelize) {
  /**жанры*/
  const Genres = sequelize.define("genres", {
    idGenre: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(1023),
      allowNull: false,
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
  return Genres;
};
