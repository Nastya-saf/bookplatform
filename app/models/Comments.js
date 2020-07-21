module.exports = function (sequelize, Sequelize) {
  /**Отзывы*/
  const { DataTypes } = require("sequelize");
  const Comments = sequelize.define("comments", {
    idReview: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    dateComment: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    sellerResponse: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    dateResponse: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    typesOfReviews: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });
  return Comments;
};
