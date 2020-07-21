module.exports = function (sequelize, Sequelize) {
  /**отзыв о сайте*/
  const CommentSite = sequelize.define("commentSite", {
    idComment: {
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
  return CommentSite;
};
