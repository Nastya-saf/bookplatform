var Books = require("./Books");
module.exports = function (sequelize, Sequelize) {
  /**Фото книг*/
  const PhotoBooks = sequelize.define("photoBooks", {
    idPhoto: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    URL: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
  });
  return PhotoBooks;
};
