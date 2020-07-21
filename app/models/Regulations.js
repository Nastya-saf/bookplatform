module.exports = function (sequelize, Sequelize) {
  /**правила сайта*/
  const Regulations = sequelize.define("regulations", {
    idRule: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    head: {
      type: Sequelize.STRING(1023),
      allowNull: false,
    },
    rule: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return Regulations;
};
